import prisma from "#prisma/prisma.js";
import { getUserIDFromAuthToken } from "#src/globals/auth/auth.utils.js";

export async function handleGetUsername(req, res) {
  const userID = getUserIDFromAuthToken(req.cookies.auth);

  try {
    const user = await prisma.users.findUnique({ where: { id: userID } });
    return res.send({
      success: true,
      username: user.username,
      message: "User's username retrieved successfully."
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: "An error occurred while retrieving the user's username."
    });
  }
}
