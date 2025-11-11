// prisma/prisma.js
// instance of prisma client

const { PrismaClient, Prisma } = require("../generated/prisma");

const prisma = new PrismaClient();

module.exports = prisma;