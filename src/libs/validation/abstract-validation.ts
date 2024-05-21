import Joi from "joi";
import { BadRequestException } from "../exceptions/bad-request-exception";
import { IPaginationOptions } from "../common/interface";
import { pagination } from "../common/constant";

export const validateBody = <T>(
  body: any,
  schema: Joi.Schema,
): T => {
  const result = schema.validate(body);
  if (result.error) {
    throw new BadRequestException(result.error.message);
  }
  return result.value;
};

export const validatePathParams = <T>(
  pathParameters: any,
  schema: Joi.ObjectSchema,
): T => {
  const result = schema.validate(pathParameters || {}, {
    abortEarly: false,
  });
  if (result.error) {
    throw new BadRequestException(result.error.message);
  }
  return result.value;
};

export const validateQueryParams = <T>(
  queryStringParameters: any,
  schema: Joi.ObjectSchema,
  options?: {
    pagination?: IPaginationOptions;
  }
): T => {
  let newSchema = schema;
  if (options?.pagination) {
    newSchema = newSchema.append({
      page: Joi.number().default(options.pagination.page || pagination.defaultPage)
        .min(1).max(options.pagination.page || pagination.defaultPage),
      pageSize: Joi.number().default(options.pagination.pageSize || pagination.defaultPageSize).min(0),
    })
  }
  const result = newSchema.validate(queryStringParameters || {}, {
    abortEarly: false,
  });
  if (result.error) {
    throw new BadRequestException(result.error.message);
  }
  return result.value;
};
