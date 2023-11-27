import { Injectable } from '@nestjs/common';
import { EmailAdapters } from './email.adapter';

@Injectable()
export class EmailManager {
  constructor(protected emailAdapters: EmailAdapters) {}

  async sendCompleteRegistrationMail(
    email: string,
    password: string,
  ): Promise<any> {
    const subject = 'Добро пожаловать! Регистрация успешно завершена';
    const message = `
      <h1>Здравствуйте! Спасибо за регистрацию на нашей платформе.</h1>
   
      <p>Для вашей учётной записи был создан аккаунт с указанным вами адресом электронной почты.</p>

      <p>Ниже предоставлены ваши учётные данные:<br>
       - электронная почта: ${email}<br>
       - пароль: ${password}</p>
      <p>Вы можете использовать указанные данные для входа в систему и начала использования наших услуг.</p>
      
      <p>Мы рекомендуем вам изменить пароль после первого входа в систему для обеспечения безопасности вашей учётной записи.</p>
      
      <p>Если у вас возникнут вопросы или вам понадобится помощь, не стесняйтесь обращаться к нам по указанным ниже контактным данным.</p>

      <p>С уважением,<br>AdjnaTec</p>
      <p><a href="mailto:feedback@2lmfa.ru">feedback@2lmfa.ru</a></p>
    `;
    this.emailAdapters.sendEmail(subject, message, email);
    return;
  }
}
