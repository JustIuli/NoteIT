import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createUserDto } from '../users/dto/create.user.dto';
import { User } from '../users/users.model';
import * as moment from 'moment';
import { encrypt } from './utils/encryptPassword';
import { loginUserDto } from '../users/dto/login.user.dto';
import { matchPasswords } from './utils/matchPasswords';
import { MailService } from '../mail/mail.service';
import { generateRandomCode } from '../mail/generateCode';
import { ChangePasswordDto } from '../users/dto/changePassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectModel('user') private readonly userModel: Model<User>,
  ) {}
  async createUser(data: createUserDto) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new UnauthorizedException('One or more fields are invalid!');
    }

    const userExists = await this.userModel.findOne({
      $or: [{ email: email }],
    });

    if (userExists) {
      throw new ConflictException('User already exists with that email!');
    }

    const hashedPass = await encrypt(password, 13);
    const user = await this.userModel.create({
      name: name,
      email: email,
      password: hashedPass,
    });

    const payload = { sub: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async loginUser(data: loginUserDto) {
    const { email, password } = data;

    if (!email || !password) {
      throw new HttpException(
        'One or more fields are invalid!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userModel.findOne({
      email: email,
    });

    if (!user) {
      throw new NotFoundException('No user was registered using that email!');
    }

    if (user && (await matchPasswords(user.password, password))) {
      const payload = { sub: user._id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new HttpException(
        'One or more fields are invalid!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async handleRecoveryCode(recipient: string) {
    try {
      // Generate a random token
      const token = generateRandomCode();

      // Update the user's secret field with the generated token
      const user = await this.userModel.findOneAndUpdate(
        { email: recipient },
        { $set: { secret: token } },
        { new: true }, // Return the modified document
      );

      if (!user) {
        throw new Error('User not found');
      }

      await this.mailService.sendUserConfirmation(token, recipient);

      return {
        success: true,
        message: 'Password reset email sent successfully',
        code: token,
      };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, message: error.message };
    }
  }

  async handleResetPassword(data: ChangePasswordDto) {
    try {
      const date = moment().format('MMMM Do YYYY, h:mm:ss a');
      const hashedPass = await encrypt(data.newPassword, 13);
      const user = await this.userModel.findOneAndUpdate(
        { email: data.userEmail },
        { $set: { password: hashedPass, secret: '' } },
        { new: true },
      );
      if (!user) {
        throw new Error('User not found');
      }

      if (user.secret !== data.secretCode) {
        throw new Error(
          "Secret Codes used for resetting the password don't match!",
        );
      }
      await this.mailService.passwordResetSuccessful(
        date,
        user.email,
        user.name,
      );
      return { success: true, message: 'Password changed successfully!' };
    } catch (error) {
      console.error('Error resetting password:', error);
      return { success: false, message: 'Error resetting password' };
    }
  }

  fetchUserData(jwtToken: string) {
    try {
      const { sub } = this.jwtService.decode(jwtToken);

      return this.userModel.findOne({ _id: sub }).select('name _id email');
    } catch (e) {
      return { msg: 'There was an error fetching the user data' };
    }
  }
}
