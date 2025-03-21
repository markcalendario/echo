import prisma from "#prisma/prisma.js";

export async function getUserData(userID) {
  return await prisma.users.findUnique({ where: { id: userID } });
}
