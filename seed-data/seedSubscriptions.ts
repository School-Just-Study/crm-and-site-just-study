import { KeystoneContext } from "@keystone-6/core/dist/declarations/src/types";
import subscriptions from "./subscriptions.json";
import templateSub from "./templateSub.json";
import clients from "./clients.json";
import { UserSubscriptionCreateInput } from ".keystone/types";

export const seedSubscriptions = async (context: KeystoneContext) => {
  const createSubscription = async (subData: UserSubscriptionCreateInput) => {
    const newSubscription = await context.query.UserSubscription.createOne({
      data: subData,
      query: "id",
    });
    console.log(`✅Added subscription ${newSubscription.id} - ${subData.name}`);
  };

  for (const subscription of subscriptions) {
    console.log(`👩 Adding subscription: ${subscription["id"]}`);
    const nameSub: string =
      templateSub.find((item) => item.id === subscription.subscriptionId)
        ?.name || "Английский индивидуальный";

    const emailStudent = clients.find(
      (item) => item.id === subscription.userId
    )?.email;

    if (emailStudent) {
      const client: UserSubscriptionCreateInput = {
        name: nameSub,
        visitCount: subscription.visitCount,
        unlimited: subscription.visitCount === 0,
        originalPrice: subscription.originalPrice,
        price: subscription.price,
        status: "finished",
        student: { connect: { email: emailStudent } },
        beginDate: new Date(subscription.beginDate),
        customVisited: subscription.visitedCount,
      };
      await createSubscription(client);
    }
  }
};
