import Joi from "joi";
import { isEmailRegistered, isUsernameRegistered } from "./auth.utils.js";

export async function validateRegister(req, res, next) {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(4)
      .max(10)
      .required()
      .external(async (username, helper) => {
        if (await isUsernameRegistered(username)) {
          return helper.message("Username is already taken.");
        }

        return username;
      }),

    email: Joi.string()
      .email()
      .required()
      .external(async (email, helper) => {
        if (await isEmailRegistered(email)) {
          return helper.message("Email is already registered.");
        }

        return email;
      }),

    password: Joi.string().min(8).max(100).required()
  });

  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.details ? error.details[0].message : error.message
    });
  }
}
