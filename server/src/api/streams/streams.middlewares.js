import Joi from "joi";
import { isStreamKeyValid } from "./streams.utils.js";

export default function validateStreamKey(req, res, next) {
  const streamKey = req.body.name;

  const schema = Joi.string()
    .trim()
    .custom((value, helper) => {
      if (!isStreamKeyValid(streamKey)) {
        return helper.message("Stream key is expired or invalid.");
      }

      return value;
    })
    .required();

  const { error, value } = schema.validate(streamKey);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body.name = value;
  next();
}
