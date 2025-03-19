import prisma from "#prisma/prisma.js";
import bcrypt from "bcrypt";

export async function isEmailRegistered(email) {
  const result = await prisma.users.findFirst({ where: { email: email } });
  return !!result;
}

export async function isUsernameRegistered(username) {
  const result = await prisma.users.findFirst({
    where: { username: username }
  });

  return !!result;
}

export function hashPassword(rawPassword) {
  return bcrypt.hashSync(rawPassword, 10);
}
