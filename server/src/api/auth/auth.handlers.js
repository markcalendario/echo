import prisma from "#prisma/prisma.js";
import { hashPassword } from "./auth.utils.js";

export async function handleRegister(req, res) {
  const { username, email, password } = req.body;
  console.log(email);

  const hashedPassword = hashPassword(password);

  try {
    await prisma.users.create({
      data: { username, email, password: hashedPassword }
    });

    return res.send({ success: true, message: "You registered successfully." });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .send({ success: false, message: "Error. Registration failed." });
  }
}
