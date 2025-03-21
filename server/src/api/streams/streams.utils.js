import jwt from "jsonwebtoken";

export function generateStreamKey(userID) {
  const data = { userID };
  const secret = process.env.STREAM_SECRET_TOKEN;
  return jwt.sign(data, secret, { expiresIn: "5m" });
}
