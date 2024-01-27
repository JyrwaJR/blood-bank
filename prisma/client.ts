import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForprisma = globalThis as unknown as {
  prisma: prismaClientSingleton | undefined;
};

const prisma = globalForprisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForprisma.prisma = prisma;

export default prisma;
