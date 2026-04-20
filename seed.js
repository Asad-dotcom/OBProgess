const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const pg = require('pg');
require('dotenv').config();

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  // SIMPLE PLAINTEXT SEED
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {
      password: 'admin123'
    },
    create: {
      username: 'admin',
      password: 'admin123',
    },
  });
  console.log('Admin seeded (Plaintext): admin / admin123');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
