import { verifyAuthToken } from "./auth.utils.js";

// Route Protection for Signed In Users
export function signedInRoute(req, res, next) {
  const authToken = req.cookies?.auth;
  const isValid = verifyAuthToken(authToken);

  if (!isValid) {
    return res.status(401).clearCookie("auth").json({
      success: false,
      message: "Unauthorized. Invalid or expired authentication token."
    });
  }

  next();
}

// Route Protection for Signed Out Routes
export function publicRoute(req, res, next) {
  const authToken = req.cookies?.auth;
  const isValid = verifyAuthToken(authToken);

  if (isValid) {
    return res.status(403).json({
      success: false,
      message: "Forbidden. You are authenticated."
    });
  }

  next();
}
