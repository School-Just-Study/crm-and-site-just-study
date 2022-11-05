import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import clients from "./clients.json";
import { ClientCreateInput } from ".keystone/types";
import { ClientStatus } from "../enums/client-status.emum";

const statusClient = (id: number) => {
  switch (id) {
    case 121692:
      return ClientStatus.New;
    case 122532:
      return ClientStatus.FirstCall;
    case 122893:
      return ClientStatus.RecordFirstLesson;
    case 121693:
      return ClientStatus.TrialLesson;
    case 121694:
      return ClientStatus.DecisionAfterTrialLesson;
    case 121695:
      return ClientStatus.LowQualityLead;
    case 121696:
      return ClientStatus.Client;
    case 121697:
      return ClientStatus.DisabledClient;
    case 121698:
      return ClientStatus.Rejection;
    default:
      return ClientStatus.New;
  }
};

export const seedClients = async (context: KeystoneContext) => {
  const createClient = async (clientData: ClientCreateInput) => {
    const client = await context.query.Client.createOne({
      data: clientData,
      query: "id",
    });
    console.log(`✅Added client ${client.id} - ${clientData.name}`);
  };

  for (const user of clients) {
    if (user["email"]) {
      const findUser = await context.query.Client.findMany({
        where: { email: { equals: user["email"] } },
        query: "id",
      });
      console.log(`🦄 Check ${user["email"]}`);

      if (findUser.length === 0) {
        console.log(`👩 Adding person: ${user["name"]} ${user["email"]}`);

        const client: ClientCreateInput = {
          language: "ru",
          name: user["name"],
          email: user["email"],
          phone: user["phone"],
          statusClient: statusClient(user.clientStateId),
        };
        await createClient(client);
      }
    }
  }
};
