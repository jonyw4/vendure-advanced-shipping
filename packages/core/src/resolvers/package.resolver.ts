import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import {
  RequestContext,
  Ctx,
  Allow,
  Permission,
  Transaction
} from '@vendure/core';
import PackageService from '../services/package.service';
import {
  MutationUpdatePackageArgs,
  MutationCreatePackageArgs,
  QueryPackagesArgs,
  QueryPackageArgs
} from '../types/generated-admin-schema';

@Resolver('Package')
export class PackageResolver {
  constructor(private packageService: PackageService) {}

  @Query()
  @Allow(Permission.ReadSettings)
  async package(@Ctx() ctx: RequestContext, @Args() { id }: QueryPackageArgs) {
    return this.packageService.findById(ctx, id);
  }

  @Query()
  @Allow(Permission.ReadSettings)
  async packages(
    @Ctx() ctx: RequestContext,
    @Args() { options }: QueryPackagesArgs
  ) {
    return this.packageService.findAll(options || undefined);
  }

  @Transaction()
  @Mutation()
  @Allow(Permission.CreateSettings)
  async createPackage(
    @Ctx() ctx: RequestContext,
    @Args() { input }: MutationCreatePackageArgs
  ) {
    return this.packageService.create(ctx, input);
  }

  @Transaction()
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
