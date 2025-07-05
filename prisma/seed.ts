import { PrismaClient } from "../generated/prisma";


const prisma = new PrismaClient();

async function main() {
  // Verificar si ya existe un usuario para no duplicar
  const userExists = await prisma.user.findFirst();

  if (!userExists) {
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@test.com',
        role: 'admin',
        password: "test"
      },
    });
    console.log('Usuario inicial creado');
  } else {
    console.log('Usuario inicial ya existe');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
