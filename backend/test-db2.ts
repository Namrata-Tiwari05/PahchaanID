import { PrismaClient } from './src/generated/prisma/client.js';
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from 'dotenv';
dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || "",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const owner = await prisma.owner.findFirst();
    console.log("DB connected successfully. Owner count/first:", !!owner);
  } catch (err) {
    console.error("DB connection error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
