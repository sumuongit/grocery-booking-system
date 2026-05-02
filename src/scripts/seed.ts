import prisma from "../config/prisma";

async function main() {
  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      id: "11111111-1111-1111-1111-111111111111",
      name: "Test User",
      email: "test@example.com",
      role: "USER",
    },
  });

  console.log("Seed user created");
}

main().finally(() => prisma.$disconnect());