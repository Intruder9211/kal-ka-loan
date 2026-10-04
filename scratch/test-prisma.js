require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  console.log("Using URL:", process.env.DATABASE_URL);
  const result = await prisma.siteAnalytics.findUnique({ where: { id: "main" } });
  console.log("Result:", result);
}
main().catch(console.error).finally(() => prisma.$disconnect());
