import { getUserIDFromAuthToken } from "#src/globals/auth/auth.utils.js";
import { getUserData } from "./users.utils.js";

export async function handleGetUsername(req, res) {
  const userID = getUserIDFromAuthToken(req.cookies.auth);

  try {
    const user = await getUserData(userID);
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

export async function handleGetID(req, res) {
  const userID = getUserIDFromAuthToken(req.cookies.auth);
  return res.send({
    success: true,
    userID: userID,
    message: "User's ID retrieved successfully."
  });
}
