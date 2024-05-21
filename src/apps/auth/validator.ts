import Joi from "joi";
import { validateBody } from "../../libs/validation/abstract-validation";
import { ILogin } from "./interface";

export const validateLoginInput = (data: any): ILogin => {
  return validateBody(data, 
    Joi.object({
      password: Joi.string().required(),
      email: Joi.string().email().required()
    })
  )
};
