import prisma from "../config/prisma";

async function main() {
  console.log('Cleaning database...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.item.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding users...');
  await prisma.user.create({
    data: {
      id: "11111111-1111-1111-1111-111111111111",
      name: "Test User",
      email: "test@example.com",
      role: "USER",
    },
  });

  console.log('Seeding items...');
  await prisma.item.createMany({
    data: [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        name: "Soap",
        price: 70.00,
        inventory: 150
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: "Toothpaste",
        price: 160.00,
        inventory: 35
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        name: "Shampoo",
        price: 250.00,
        inventory: 50
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        name: "Hand Wash",
        price: 90.00,
        inventory: 65
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        name: "Detergent",
        price: 180.00,
        inventory: 20
      }
    ],
  });

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });