import prisma from "#prisma/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export function isPasswordCorrect(guess, stored) {
  return bcrypt.compareSync(guess, stored);
}

export function generateAuthToken(userID) {
  const payload = { userID: userID };
  const secret = process.env.AUTH_SECRET_TOKEN;
  const options = { expiresIn: "1d" };
  return jwt.sign(payload, secret, options);
}
