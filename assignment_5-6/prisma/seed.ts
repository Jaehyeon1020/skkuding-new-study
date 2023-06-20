import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const restaurant1 = await prisma.restaurant.upsert({
    where: { name: '봉수육' },
    update: {},
    create: {
      name: '봉수육',
      address: '경기 수원시 장안구 율전로108번길 11 1층',
      phone: '0507-1460-0903',
    },
  });

  const restaurant2 = await prisma.restaurant.upsert({
    where: { name: '청년밥상' },
    update: {},
    create: {
      name: '청년밥상',
      address: '경기 수원시 장안구 서부로2136번길 10 1층',
      phone: '0507-1307-1822',
    },
  });

  console.log({ restaurant1, restaurant2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
