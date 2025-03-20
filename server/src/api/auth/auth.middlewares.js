import usersSchema from "#src/schema/users.schema.js";
import Joi from "joi";
import { isEmailRegistered, isUsernameRegistered } from "./auth.utils.js";

export async function validatePostRegister(req, res, next) {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(usersSchema.username.min)
      .max(usersSchema.username.max)
      .required()
      .external(async (username, helper) => {
        if (await isUsernameRegistered(username)) {
          return helper.message("Username is already taken.");
        }

        return username;
      }),

    email: Joi.string()
      .email()
      .max(usersSchema.email.max)
      .required()
      .external(async (email, helper) => {
        if (await isEmailRegistered(email)) {
          return helper.message("Email is already registered.");
        }

        return email;
      }),

    password: Joi.string()
      .min(usersSchema.password.min)
      .max(usersSchema.password.max)
      .required()
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
