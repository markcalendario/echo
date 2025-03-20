import prisma from "#prisma/prisma.js";
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
    console.error(e);
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
    return res.status(401).send({
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
