import jwt from "jsonwebtoken";

export function verifyAuthToken(authToken) {
  try {
    jwt.verify(authToken, process.env.AUTH_SECRET_TOKEN);
    return true;
  } catch {
    return false;
  }
}
