import usersSchema from "#src/schema/users.schema.js";
import Joi from "joi";
import { isEmailRegistered, isUsernameRegistered } from "./auth.utils.js";

export async function validatePostSignUp(req, res, next) {
  const schema = Joi.object({
    username: Joi.string()
      .trim()
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
      .trim()
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
      .trim()
      .min(usersSchema.password.min)
      .max(usersSchema.password.max)
      .required()
  });

  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (e) {
    if (e instanceof Joi.ValidationError) {
      return res.send({
        isSuccess: false,
        message: e?.details[0]?.message
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error. Cannot validate registration request."
    });
  }
}

export async function validatePostSignIn(req, res, next) {
  const schema = Joi.object({
    username: Joi.string()
      .trim()
      .alphanum()
      .min(usersSchema.username.min)
      .max(usersSchema.username.max)
      .required()
      .external(async (value, helpers) => {
        if (!(await isUsernameRegistered(value))) {
          return helpers.message("Username is not registered.");
        }

        return value;
      }),
    password: Joi.string().trim().required()
  });

  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (e) {
    if (e instanceof Joi.ValidationError) {
      return res.send({
        isSuccess: false,
        message: e?.details[0]?.message
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error. Cannot validate login request."
    });
  }
}
