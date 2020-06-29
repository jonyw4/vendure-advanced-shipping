import { RequestContext, PaginatedList, ListQueryBuilder } from '@vendure/core';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import Package from '../entities/package.entity';
import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';

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
}

export default PackageService;
