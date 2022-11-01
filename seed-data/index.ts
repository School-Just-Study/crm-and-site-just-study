import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import { updateUserSub } from "./updateUserSub";

export async function insertSeedData(context: KeystoneContext) {
  console.log(`🌱 Inserting seed data`);

  await updateUserSub(context);

  console.log(`✅ Seed data inserted`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}
