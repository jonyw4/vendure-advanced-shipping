import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { RequestContext, Ctx, Allow } from '@vendure/core';
import PackageService from '../services/package.service';

@Resolver()
export class PackageResolver {
  constructor(private packageService: PackageService) {}

  @Query()
  // @Allow(Permission.ReadSettings)
  async packages(@Ctx() ctx: RequestContext, @Args() args: any) {
    return this.packageService.findAll(ctx, args.options || undefined);
  }

  @Mutation()
  // @Allow(Permission.CreateSettings)
  async createPackage(@Ctx() ctx: RequestContext, @Args() args: any) {
    return this.packageService.create(ctx, args.input);
  }
}

export default PackageResolver;
