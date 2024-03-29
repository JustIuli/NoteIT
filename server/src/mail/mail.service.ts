import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(token: string, recipient: string) {
    await this.mailerService.sendMail({
      to: recipient,
      subject: 'Password Recovery Code',
      template: './sentRecoveryCode',
      context: {
        code: token,
      },
    });
  }

  async passwordResetSuccessful(
    date: string,
    recipient: string,
    name:string
  ) {
    await this.mailerService.sendMail({
      to: recipient,
      subject: 'Password Changed Successfully',
      template: './passwordChangedSuccessfully',
      context: {
        name:name,
        date: date,
      },
    });
  }
}
