import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { RequestContext, Ctx, Allow, Permission } from '@vendure/core';
import PackageService from '../services/package.service';
import {
  MutationCreatePackageArgs,
  QueryPackagesArgs
} from '@vendure-advanced-shipping/common/lib/generated-admin-schema';

@Resolver()
export class PackageResolver {
  constructor(private packageService: PackageService) {}

  @Query()
  @Allow(Permission.ReadSettings)
  async packages(@Ctx() ctx: RequestContext, @Args() args: QueryPackagesArgs) {
    return this.packageService.findAll(ctx, args.options || undefined);
  }

  @Mutation()
  @Allow(Permission.CreateSettings)
  async createPackage(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationCreatePackageArgs
  ) {
    return this.packageService.create(ctx, args.input);
  }
}

export default PackageResolver;
