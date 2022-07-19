import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { Roles } from "../enums/roles.enum";
import format from "date-fns/format";
import { MAIL_USER } from "../config";
import { baseTemplateEmail } from "../mailTemplate/base";
import { mailer } from "../lib/nodemailer";
import { Lists } from ".keystone/types";

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
    where: { role: { in: [Roles.Admin, Roles.Manager] } },
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
