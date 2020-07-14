import { ID, Order, Product, EntityNotFoundError } from '@vendure/core';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
  MassUnit,
  DistanceUnit,
  ProductCustomFields
} from '../types/generated-admin-schema';
import convertUnit from '../utils/convertUnit';
import { ShippingPackagesEntity as ShippingPackages } from '../entities/shipping-packages.entity';
import PackageService from './package.service';

type ProductWithCustomFields = Product & {
  customFields: ProductCustomFields & {
    distanceUnit: DistanceUnit;
    massUnit: MassUnit;
  };
};

@Injectable()
export class ShippingPackagesService {
  constructor(
    @InjectConnection() private connection: Connection,
    private packageService: PackageService
  ) {}
  massUnit: MassUnit = MassUnit.Kg;
  distanceUnit: DistanceUnit = DistanceUnit.Cm;

  getOrderShippingPackages(orderId: ID) {
    return this.connection.getRepository(ShippingPackages).findOne(orderId);
  }

  async create(order: Order) {
    const shippingPackages = await this.getOrderShippingPackages(order.id);

    const newShippingPackages = new ShippingPackages({
      id: shippingPackages?.id || undefined,
      order: order,
      packages: await this.getPackagesForShipping(order)
    });

    if (!order.id) {
      return newShippingPackages;
    }
    return this.connection.manager.save(newShippingPackages);
  }

  async getPackagesForShipping(
    order: Order
  ): Promise<ShippingPackages['packages']> {
    const itemsVolumeAndWeight = await this.getItemsVolumeAndWeight(
      order,
      this.distanceUnit,
      this.massUnit
    );
    let { volume: itemsVolume } = itemsVolumeAndWeight;
    const { weight: itemsWeight } = itemsVolumeAndWeight;
    const { items: packages } = await this.packageService.findAll();

    const chosenPackageList = [];
    while (itemsVolume > 0) {
      // eslint-disable-next-line no-loop-func
      const availablePackages = packages.filter(
        (packageData) => packageData.volume(this.distanceUnit) > itemsVolume
      );

      let chosenPackage;
      if (availablePackages.length > 0) {
        [chosenPackage] = availablePackages.sort(
          (packageA, packageB) =>
            packageA.volume(this.distanceUnit) -
            packageB.volume(this.distanceUnit)
        );
      } else {
        [chosenPackage] = packages.sort(
          (packageA, packageB) =>
            packageB.volume(this.distanceUnit) -
            packageA.volume(this.distanceUnit)
        );
      }
      chosenPackageList.push(chosenPackage);
      itemsVolume -= chosenPackage.volume(this.distanceUnit);
    }
    // Here we cant have a exact weigh for package because we don't know what are the items inside each package. This will generate a AVERAGE of weight
    const packagesItemsWeight = itemsWeight / chosenPackageList.length;

    return chosenPackageList.map((packageData) => ({
      ...packageData,
      productsWeight: itemsWeight,
      totalWeight:
        packageData.weight +
        convertUnit(packagesItemsWeight)
          .from(this.massUnit)
          // @ts-ignore
          .to(packageData.massUnit)
    }));
  }

  async getItemsVolumeAndWeight(
    order: Order,
    distanceUnit: DistanceUnit,
    massUnit: MassUnit
  ) {
    let totalVolume = 0;
    let totalWeight = 0;

    /** Catch all products ids and search in database */
    const productsIds = order.lines.map(
      (line) => line.productVariant.productId
    );
    // @ts-ignore
    const products: ProductWithCustomFields[] = await this.connection.manager.findByIds(
      Product,
      productsIds
    );
    for (const line of order.lines) {
      const product = products.find(
        (p) => p.id === line.productVariant.productId
      );

      if (!product) {
        throw new EntityNotFoundError('Product', line.productVariant.productId);
      }

      let { height, width, length, weight } = product.customFields;
      const {
        distanceUnit: productDistanceUnit,
        massUnit: productMassUnit
      } = product.customFields;

      // Ignore the product if doesn't have data dimensions info
      if (
        !height ||
        !width ||
        !length ||
        !weight ||
        !productDistanceUnit ||
        !productMassUnit
      ) {
        break;
      }
      height = convertUnit(height)
        // @ts-ignore
        .from(productDistanceUnit)
        .to(distanceUnit);
      width = convertUnit(width)
        // @ts-ignore
        .from(productDistanceUnit)
        .to(distanceUnit);
      length = convertUnit(length)
        // @ts-ignore
        .from(productDistanceUnit)
        .to(distanceUnit);
      weight = convertUnit(weight)
        // @ts-ignore
        .from(productMassUnit)
        .to(massUnit);

      const itemVolume = height * width * length;
      totalVolume += itemVolume;
      totalWeight += weight;
    }
    return {
      volume: totalVolume,
      weight: totalWeight,
      massUnit,
      distanceUnit
    };
  }
}
export default ShippingPackagesService;
