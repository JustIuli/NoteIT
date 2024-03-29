import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserSchema } from './users.model';
import { UsersService } from './users.service';
import { MailModule } from '../mail/mail.module';
import { AuthService } from '../auth/auth.service';
@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
