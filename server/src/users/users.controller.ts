import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Guest } from '../auth/auth.guard';
import { loginUserDto } from './dto/login.user.dto';
import { createUserDto } from './dto/create.user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenDto } from './dto/access.token.dto';
import { RecipientUserDto } from './dto/recipient.user.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Login the user and send back a JWT Token' })
  @ApiTags('Auth')
  @ApiResponse({
    status: 200,
    description: 'Returns a JWT Token after a successful login',
    type: AccessTokenDto,
    isArray: false,
  })
  @Guest()
  @Post('/login')
  login(@Body() data: loginUserDto): Promise<AccessTokenDto> {
    try {
      return this.authService.loginUser(data);
    } catch (e) {
      console.log(e);
    }
  }

  @ApiOperation({ summary: 'Register the user and send back a JWT Token' })
  @ApiTags('Auth')
  @ApiResponse({
    status: 200,
    description: 'Returns a JWT Token after a successful registration',
    type: AccessTokenDto,
    isArray: false,
  })
  @Guest()
  @Post('/register')
  create(@Body() data: createUserDto): Promise<AccessTokenDto> {
    try {
      return this.authService.createUser(data);
    } catch (e) {
      console.log(e.message);
    }
  }

  @ApiOperation({
    summary: 'Send an email to the user with a 6 character code',
  })
  @ApiResponse({
    status: 200,
    description:
      'Finds the user with the provided email , generates a 6 character code and ' +
      "updates the user's 'secret' field with the generated code",
    type: null,
    isArray: false,
  })
  @Guest()
  @Patch('/sendRecoveryCode')
  @ApiTags('Auth')
  async handleRecoveryCode(@Query() params: RecipientUserDto) {
    if (!params.recipient_Email) {
      return { msg: 'Something went wrong!' };
    }
    return this.authService.handleRecoveryCode(params.recipient_Email);
  }

  @ApiOperation({ summary: 'Handle changing the user password' })
  @ApiResponse({
    status: 200,
    description:
      'Finds the user with the provided email , validates the 6 character code once again' +
      ' and updates the user password . Send email to inform about this action also',
    type: null,
    isArray: false,
  })
  @Guest()
  @Patch('/change-password')
  @ApiTags('Auth')
  async handlePasswordReset(@Body() data: ChangePasswordDto) {
    if (!data.newPassword || !data.secretCode) {
      return { msg: 'One or more of the provided values are invalid!' };
    }
    return this.authService.handleResetPassword(data);
  }

  @ApiOperation({ summary: "Fetch the user's data" })
  @ApiResponse({
    status: 200,
    description: "Returns a user's data",
    type: null,
    isArray: false,
  })
  @Post('/user-data')
  @ApiTags('Auth')
  async fetchUserData(@Body() data: AccessTokenDto) {
    return this.authService.fetchUserData(data.access_token);
  }
}
