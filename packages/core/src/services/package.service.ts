import {
  RequestContext,
  ListQueryBuilder,
  getEntityOrThrow,
  patchEntity
} from '@vendure/core';
import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import Package from '../entities/package.entity';
import {
  CreatePackageInput,
  UpdatePackageInput
} from '@vendure-advanced-shipping/common/lib/generated-admin-schema';

@Injectable()
export class PackageService {
  constructor(
    @InjectConnection() private connection: Connection,
    private listQueryBuilder: ListQueryBuilder
  ) {}

  findAll(ctx: RequestContext, options?: ListQueryOptions<Package>) {
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

  create(ctx: RequestContext, input: CreatePackageInput) {
    const newPackage = new Package(input);
    return newPackage;
  }

  async update(ctx: RequestContext, input: UpdatePackageInput) {
    const packageBox = await getEntityOrThrow(
      this.connection,
      Package,
      input.id
    );
    return this.connection
      .getRepository(Package)
      .save(patchEntity(packageBox, input));
  }
}

export default PackageService;
