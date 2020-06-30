import { RequestContext, PaginatedList, ListQueryBuilder } from '@vendure/core';
import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import Package from '../entities/package.entity';
import { CreatePackageInput } from '@vendure-advanced-shipping/common/lib/generated-admin-schema';

@Injectable()
export class PackageService {
  constructor(
    @InjectConnection() private connection: Connection,
    private listQueryBuilder: ListQueryBuilder
  ) {}

  findAll(
    ctx: RequestContext,
    options?: ListQueryOptions<Package>
  ): Promise<PaginatedList<Package>> {
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

  async create(
    ctx: RequestContext,
    input: CreatePackageInput
  ): Promise<Package> {
    const newPackage = new Package(input);
    return newPackage;
  }
}

export default PackageService;
