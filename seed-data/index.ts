import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { UserCreateInput } from ".keystone/types";
import { Roles } from "../enums/roles.enum";
import { clientStatusParser } from "../lib/clientStatusParser";
import { levelStudentParser } from "../lib/levelStudentParser";
import clients from "./clients.json";

export async function insertSeedData(context: KeystoneContext) {
  console.log(`🌱 Inserting seed data`);

  const createPerson = async (personData: UserCreateInput) => {
    let person = await context.query.User.findOne({
      where: { email: personData.email },
      query: "id",
    });

    if (!person) {
      person = await context.query.User.createOne({
        data: personData,
        query: "id",
      });
    }
  };

  // const createReview = async (
  //   reviewData: ProductReviewCreateInput,
  // ) => {
  //
  //   let review = await context.query.ProductReview.createOne({
  //     data: { ...reviewData },
  //     query: "id",
  //   });
  // };

  for (const client of clients) {
    console.log(`👩 Adding person: ${client["ФИО"]}`);
    const person = {
      language: "ru",
      name: client["ФИО"],
      email: client["Email"],
      phone: client["Телефон"],
      statusClient: clientStatusParser(client["Статус ученика"]),
      levelStudent: levelStudentParser(client["Уровень подготовки"]),
      goal: client["Цель изучения языка"],
      role: Roles.Student,
      comment: `Источник: ${client["Источник клиента"]}, Должность: ${client["Должность"]}, Организация: ${client["Организация"]}`,
    };
    await createPerson(person);
  }

  // for (const item of reviews) {
  //   console.log(`👩 Adding review: ${item["comment_author"]}`);
  //   const review = {
  //     language: "ru",
  //     desc: item["comment_content"],
  //   };
  //   await createReview(review);
  // }

  console.log(`✅ Seed data inserted`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
