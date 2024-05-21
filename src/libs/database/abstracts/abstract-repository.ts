import { EntityTarget, ObjectLiteral, SelectQueryBuilder } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import datasource from "../datasource";
import { IPaginate, IPaginationOptions } from "../../common/interface";
import { pagination } from "../../common/constant";

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  getRepo<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>) {
    return datasource.getRepo(entity);
  }

  async parsePaginate<Entity extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<Entity>,
    { page, pageSize } : IPaginationOptions
  ): Promise<IPaginate<Entity>> {
    page = Number(page) || pagination.defaultPage;
    pageSize = Number(pageSize) || pagination.defaultPageSize;
    const [items, total] = await queryBuilder.take(pageSize).skip((page - 1) * pageSize).getManyAndCount();
    return this.createPaginationObject(
      items,
      total,
      (page - 1) * pageSize,
      pageSize
    );
  }

  async parseRawPaginate<Entity extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<Entity>,
    { page, pageSize } : IPaginationOptions
  ): Promise<IPaginate<Entity>> {
    page = Number(page) || pagination.defaultPage;
    pageSize = Number(pageSize) || pagination.defaultPageSize;
    const offset = pageSize * (page - 1);
    const items = await queryBuilder.offset(page).limit(pageSize).getRawMany();
    const total = await queryBuilder.getCount();
    return this.createPaginationObject(
      items,
      total,
      offset,
      pageSize
    );
  }

  createPaginationObject<Entity extends ObjectLiteral>(
    items: Entity[],
    totalItems: number,
    offset: number = pagination.defaultOffset,
    limit: number = pagination.defaultPageSize,
  ) {
    return {
      items,
      totalItems,
      itemsPerPage: limit,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: Math.floor(offset / limit) + 1,
    };
  }
}
