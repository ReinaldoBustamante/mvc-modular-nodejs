import { PrismaClient } from "../generated/prisma";
import { BcryptAdapter } from "../src/adapters/bcrypt.adapter";

const prisma = new PrismaClient();

async function main() {
  // Verificar si ya existe un usuario para no duplicar
  const userExists = await prisma.user.findFirst();

  if (!userExists) {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@test.com",
        role: "admin",
        password: await BcryptAdapter.hashPassword("test123"),
      },
    });
    console.log("Usuario inicial creado");
  } else {
    console.log("Usuario inicial ya existe");
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
