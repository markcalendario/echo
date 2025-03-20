import prisma from "#prisma/prisma.js";
import { verifyAuthToken } from "#src/globals/auth/auth.utils.js";
import {
  generateAuthToken,
  hashPassword,
  isPasswordCorrect
} from "./auth.utils.js";

export async function handlePostSignUp(req, res) {
  const { username, email, password } = req.body;

  const hashedPassword = hashPassword(password);

  try {
    await prisma.users.create({
      data: { username, email, password: hashedPassword }
    });

    return res.send({
      success: true,
      message: "You registered successfully."
    });
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: "Error. Registration failed."
    });
  }
}

export async function handlePostSignIn(req, res) {
  const { username, password } = req.body;

  // Password Validation

  let user;

  try {
    user = await prisma.users.findUnique({
      where: { username }
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "Error. Login failed."
    });
  }

  const storedPassword = user.password;

  if (!user || !isPasswordCorrect(password, storedPassword)) {
    return res.send({
      success: false,
      message: "Invalid credentials."
    });
  }

  // Auth Token Generation

  const token = generateAuthToken(user.id.toString());

  return res
    .cookie("auth", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 })
    .send({ success: true, message: "You signed in successfully." });
}

export async function handleSignOut(req, res) {
  return res
    .clearCookie("auth")
    .send({ success: true, message: "You signed out successfully." });
}

export async function handleGetAuth(req, res) {
  const isAuthenticated = verifyAuthToken(req.cookies?.auth);

  if (!isAuthenticated) res.clearCookie("auth");

  return res.send({
    success: true,
    message: "Authentication fetched successfully.",
    isAuthenticated
  });
}
