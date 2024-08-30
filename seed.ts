import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const rooms = Array.from({ length: 30 }).map(() => ({
    name: faker.lorem.words(3),
    description: faker.lorem.sentences(2),
    price: parseFloat(faker.commerce.price({ min: 50, max: 500 })),
    location: faker.address.city(),
    image_url: faker.image.urlLoremFlickr({ category: 'hotel' }),
  }));

  await prisma.rooms.createMany({
    data: rooms,
  });

  console.log('30 rooms have been created successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
