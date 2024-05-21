import { ObjectLiteral } from "typeorm";

export interface IPaginate<Entity extends ObjectLiteral> {
  items: Entity[],
  totalItems: number,
  itemsPerPage: number,
  totalPages: number,
  currentPage: number,
}

export interface IPaginationOptions {
  page: number,
  pageSize: number
}

export interface ICurrentUser {
  id: number;
  email: string
}

export interface AuthenticatedRequest extends Request {
  user: ICurrentUser;
  query: any
}
