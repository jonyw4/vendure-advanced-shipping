import { Args, Query, Resolver } from '@nestjs/graphql';
import { RequestContext, Ctx } from '@vendure/core';
import PackageService from '../services/package.service';

@Resolver()
export class PackageResolver {
  constructor(private packageService: PackageService) {}

  @Query()
  async packages(@Ctx() ctx: RequestContext, @Args() args: any) {
    return this.packageService.findAll(ctx, args.options || undefined);
  }
}

export default PackageResolver;
