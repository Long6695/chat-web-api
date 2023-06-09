import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityId } from 'typeorm/repository/EntityId';

export interface BaseInterfaceRepository<T> {
  save(data: DeepPartial<T>): Promise<T>;

  saveMany(data: DeepPartial<T>[]): Promise<T[]>;

  findOneById(id: number): Promise<T>;

  findByCondition(filterCondition: FindOneOptions<T>): Promise<T>;

  findAll(options?: FindManyOptions<T>): Promise<T[]>;

  remove(data: T): Promise<T>;

  findWithRelations(relations: FindManyOptions<T>): Promise<T[]>;

  preload(entityLike: DeepPartial<T>): Promise<T>;

  update(
    target: EntityId,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult>;
}
