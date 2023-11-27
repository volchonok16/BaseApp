import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { environmentConstant } from '../../constants/environment.constant';

@Injectable()
export class EmailAdapters {
  private readonly logger = new Logger(EmailAdapters.name);
  private readonly transportConfig;

  constructor(private readonly configService: ConfigService) {
    const mailConfig = environmentConstant.mail;

    this.transportConfig = {
      host: this.configService.get(mailConfig.host),
      port: this.configService.get(mailConfig.port),
      secure: false,
      auth: {
        user: this.configService.get(mailConfig.mailbox),
        pass: this.configService.get(mailConfig.password),
      },
    };
  }

  async sendEmail(
    subject: string,
    message: string,
    email: string,
  ): Promise<void> {
    try {
      //const transport = await nodemailer.createTransport(this.transportConfig);
      const transport = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'buckstabu030194@gmail.com',
          pass: 'czxfvurrxhdrghmz',
        },
      });

      await transport.sendMail({
        from: 'AdjnaTec <mail>',
        to: email,
        subject: subject,
        html: message,
      });

      this.logger.log('Email sent successfully');
      return;
    } catch (err) {
      this.logger.error(`Email sending error: ${err}`);
    }
  }
}
