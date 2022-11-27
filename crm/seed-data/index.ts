import { KeystoneContext } from '@keystone-6/core/dist/declarations/src/types';
import { seedClients } from './seedClients';

export async function insertSeedData(context: KeystoneContext) {
    console.log(`🌱 Inserting seed data`);

    await seedClients(context);

    console.log(`✅ Seed data inserted`);
    console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``);
    process.exit();
}
