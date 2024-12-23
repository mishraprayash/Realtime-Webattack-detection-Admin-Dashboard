import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['error'], // Enable detailed logging
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Ensure graceful disconnection
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});