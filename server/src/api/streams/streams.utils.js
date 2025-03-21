import jwt from "jsonwebtoken";

export function generateStreamKey(userID) {
  const data = { userID };
  const secret = process.env.STREAM_SECRET_TOKEN;
  return jwt.sign(data, secret, { expiresIn: "5m" });
}

export function generateInvalidStreamKey(userID) {
  const data = { userID };
  const secret = process.env.STREAM_SECRET_TOKEN;
  return jwt.sign(data, secret, { expiresIn: "1s" });
}

export function isStreamKeyValid(streamKey) {
  const secret = process.env.STREAM_SECRET_TOKEN;

  try {
    jwt.verify(streamKey, secret);
    return true;
  } catch {
    return false;
  }
}

export function getUserIDFromStreamKey(validStreamKey) {
  const decoded = jwt.decode(validStreamKey);
  return decoded?.userID;
}
