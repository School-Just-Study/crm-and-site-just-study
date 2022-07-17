import { createTransport } from "nodemailer";
import { MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER } from "../config";
import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { Roles } from "../enums/roles.enum";
import { Lists } from ".keystone/types";
import { baseTemplateEmail } from "../mailTemplate/base";
import format from "date-fns/format";

export const mailer = createTransport({
  host: MAIL_HOST,
  port: +MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export const fieldsEmail = (name: string, value: string) => {
  return `
      <div style='display: flex; gap: 8px'>
        <p>${name}:</p>
        <p>${value}</p>
      </div>
  `;
};

export const notifyNewClient = async (
  client: Lists.User.Item,
  ctx: KeystoneContext
) => {
  const managers = await ctx.query.User.findMany({
    where: { role: { equals: Roles.Admin } },
    query: `email`,
  });

  const managersEmail = managers.map((user) => user.email);

  const clientInfo = `
    <div style='display:flex; flex-direction: column; gap: 8px'>
    ${fieldsEmail("Имя", client.name)}
    ${fieldsEmail("Телефон", `${client.phone}`)}
    ${fieldsEmail(
      "Дата",
      `${format(
        new Date(client.createdAt as unknown as string),
        "dd.MM.yyyy HH:mm"
      )}`
    )}
    ${fieldsEmail("Email", client.email)}
    ${fieldsEmail("Коммент", client.comment)}
</div>
  `;

  await mailer.sendMail({
    to: managersEmail,
    from: MAIL_USER,
    subject: "У вас новый лид",
    html: baseTemplateEmail("Новый лид", clientInfo),
  });
};
