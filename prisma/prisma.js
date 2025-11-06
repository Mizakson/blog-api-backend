// prisma/prisma.js
// instance of prisma client

const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;