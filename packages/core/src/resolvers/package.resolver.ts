import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { RequestContext, Ctx, Allow, Permission } from '@vendure/core';
import PackageService from '../services/package.service';
import {
  MutationUpdatePackageArgs,
  MutationCreatePackageArgs,
  QueryPackagesArgs
} from '@vendure-advanced-shipping/common/lib/generated-admin-schema';

@Resolver()
export class PackageResolver {
  constructor(private packageService: PackageService) {}

  @Query()
  @Allow(Permission.ReadSettings)
  async packages(
    @Ctx() ctx: RequestContext,
    @Args() { options }: QueryPackagesArgs
  ) {
    return this.packageService.findAll(ctx, options || undefined);
  }

  @Mutation()
  @Allow(Permission.CreateSettings)
  async createPackage(
    @Ctx() ctx: RequestContext,
    @Args() { input }: MutationCreatePackageArgs
  ) {
    return this.packageService.create(ctx, input);
  }

  @Mutation()
  @Allow(Permission.UpdateSettings)
  async updatePackage(
    @Ctx() ctx: RequestContext,
    @Args() { input }: MutationUpdatePackageArgs
  ) {
    return this.packageService.update(ctx, input);
  }
}

export default PackageResolver;
