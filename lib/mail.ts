import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  // @ts-ignore
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `
    <div style='
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    '>
      <h2>Георгий приветики!</h2>
      <p>${text}</p>

      <p>😘, твоя акулка</p>
    </div>
  `;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(resetToken: string, to: string): Promise<void> {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: `"Письмо от мужа 👻" <no-reply@just-study.ru>`,
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Чтобы купить новый айфон переходи по ссылке!
      <a href='${process.env.FRONTEND_URL}/reset?token=${resetToken}'>Click Here</a>
    `),
  });
  if (process.env.MAIL_USER?.includes('ethereal.email')) {
    console.log(`� Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }
}
