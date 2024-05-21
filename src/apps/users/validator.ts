import Joi from "joi";
import { validateBody } from "../../libs/validation/abstract-validation";
import { IRegisterUser } from "./interface";

export const validateRegisterUserInput = (data: any): IRegisterUser => {
  return validateBody(data, 
    Joi.object({
      password: Joi.string().required(),
      email: Joi.string().email().required()
    })
  )
};
