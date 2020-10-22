import {
  ListQueryBuilder,
  patchEntity,
  ID,
  TransactionalConnection,
  RequestContext
} from '@vendure/core';
import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';
import { Injectable } from '@nestjs/common';
import { PackageEntity as Package } from '../entities/package.entity';
import {
  CreatePackageInput,
  UpdatePackageInput
} from '../types/generated-admin-schema';

@Injectable()
export class PackageService {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder
  ) {}

  findAll(options?: ListQueryOptions<Package>) {
    return this.listQueryBuilder
      .build(Package, options)
      .getManyAndCount()
      .then(([packages, totalItems]) => {
        return {
          items: packages,
          totalItems
        };
      });
  }

  findById(ctx: RequestContext, id: ID) {
    return this.connection.getEntityOrThrow(ctx, Package, id);
  }

  create(ctx: RequestContext, input: CreatePackageInput) {
    const newPackage = new Package(input);
    return this.connection.getRepository(ctx, Package).save(newPackage);
  }

  async update(ctx: RequestContext, input: UpdatePackageInput) {
    const packageBox = await this.findById(ctx, input.id);
    return this.connection
      .getRepository(Package)
      .save(patchEntity(packageBox, input));
  }
}

export default PackageService;
