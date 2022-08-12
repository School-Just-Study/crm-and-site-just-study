import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import clients from "./clients.json";
import {
  ClientCreateInput,
  ClientLevelStudentType,
  ClientStatusClientType,
  SourceClientWhereUniqueInput,
} from ".keystone/types";

export const seedClients = async (context: KeystoneContext) => {
  const createClient = async (clientData: ClientCreateInput) => {
    const client = await context.query.Client.createOne({
      data: clientData,
      query: "id",
    });
    console.log(`✅Added client ${client.id} - ${clientData.name}`);
  };

  for (const user of clients) {
    console.log(`👩 Adding person: ${user["name"]} ${user["email"]}`);
    const source: Array<SourceClientWhereUniqueInput> = user.source.map(
      (item) => {
        return {
          id: item.id,
        };
      }
    );
    const client: ClientCreateInput = {
      language: user.language,
      name: user.name,
      email: user?.email,
      phone: user?.phone,
      statusClient: user.statusClient as ClientStatusClientType,
      levelStudent: user.levelStudent as ClientLevelStudentType,
      profession: user.profession,
      goal: user.goal,
      source: { connect: source },
      comment: user.comment,
    };
    await createClient(client);
  }
};
