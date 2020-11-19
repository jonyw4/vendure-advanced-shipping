import {
  ID,
  Order,
  Product,
  EntityNotFoundError,
  patchEntity
} from '@vendure/core';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {
  MassUnit,
  DistanceUnit,
  ProductCustomFields
} from '../types/generated-admin-schema';
import { Unarray } from '../types/utils';
import { convertUnits } from '../utils';
import { ShippingPackagesEntity as ShippingPackages } from '../entities/shipping-packages.entity';
import PackageService from './package.service';
import { PackageEntity } from '../entities';

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

  getOrderShippingPackages(orderId: ID): Promise<ShippingPackages | undefined> {
    return this.connection.getRepository(ShippingPackages).findOne(orderId);
  }

  async create(order: Order): Promise<ShippingPackages> {
    const shippingPackagesInput = {
      order: order,
      packages: await this.getPackagesForShipping(order)
    };

    if (!order.id) {
      return new ShippingPackages(shippingPackagesInput);
    }

    const currentShippingPackages = await this.getOrderShippingPackages(
      order.id
    );

    return this.connection.manager.save(
      currentShippingPackages
        ? patchEntity(currentShippingPackages, shippingPackagesInput)
        : new ShippingPackages(shippingPackagesInput)
    );
  }

  /**
   * Return ONE package for shipping based on product dimension
   *
   * To choose the right package the function following algorithm:
   * 1. Get items volume and weight
   * 2. Get all packages from DB
   * 3. Filter all packages that have volume bigger than the items
   * 4. Sort the packages based on volume
   * 5. Chose and check if have a package
   * 6. Return the package
   * */
  async getPackageForShipping(
    order: Order
  ): Promise<Unarray<ShippingPackages['packages']> | null> {
    const itemsVolumeAndWeight = await this.getItemsVolumeAndWeight(
      order,
      this.distanceUnit,
      this.massUnit
    );
    const { volume: itemsVolume } = itemsVolumeAndWeight;
    const { weight: itemsWeight } = itemsVolumeAndWeight;
    const { items: packages } = await this.packageService.findAll();

    const availablePackages = packages.filter(
      (packageData) => packageData.volume(this.distanceUnit) > itemsVolume
    );

    if (!availablePackages || availablePackages.length === 0) {
      return null;
    }

    const [chosenPackage] = availablePackages.sort(
      (packageA, packageB) =>
        packageA.volume(this.distanceUnit) - packageB.volume(this.distanceUnit)
    );

    return {
      ...chosenPackage,
      productsWeight: itemsWeight,
      totalWeight:
        chosenPackage.weight +
        convertUnits(itemsWeight).from(this.massUnit).to(chosenPackage.massUnit)
    };
  }

  /**
   * Return MANY package for shipping based on product dimension
   *
   * To choose the right package the function following algorithm:
   * 1. Get items volume and weight
   * 2. Get all packages from DB
   * 3. Run this loop until the items volume turns to 0
   *    1. Check if the items volume is bigger than the packages.
   *        - If is, get the bigger package from the db
   *        - If isn't, get the bigger package based on the remain item volume
   *    2. Add package in chosenPackageList and remove the package volume on items volume
   * 4. Divide the items weight equally in all packages
   * 5. Return the list of packages
   * */
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

    const chosenPackageList: PackageEntity[] = [];
    while (itemsVolume > 0) {
      // eslint-disable-next-line no-loop-func
      const availablePackages = packages.filter(
        (packageData) => packageData.volume(this.distanceUnit) > itemsVolume
      );

      let chosenPackage: PackageEntity;
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
        convertUnits(packagesItemsWeight)
          .from(this.massUnit)
          .to(packageData.massUnit)
    }));
  }

  async getItemsVolumeAndWeight(
    order: Order,
    distanceUnit: DistanceUnit,
    massUnit: MassUnit
  ): Promise<{
    volume: number;
    weight: number;
    massUnit: MassUnit;
    distanceUnit: DistanceUnit;
  }> {
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
      height = convertUnits(height).from(productDistanceUnit).to(distanceUnit);

      width = convertUnits(width).from(productDistanceUnit).to(distanceUnit);

      length = convertUnits(length).from(productDistanceUnit).to(distanceUnit);

      weight = convertUnits(weight).from(productMassUnit).to(massUnit);

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
