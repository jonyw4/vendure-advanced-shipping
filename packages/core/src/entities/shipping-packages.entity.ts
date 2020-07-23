import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { VendureEntity, DeepPartial, Order } from '@vendure/core';
import { PackageEntity } from './package.entity';

@Entity()
export class ShippingPackagesEntity extends VendureEntity {
  constructor(input?: DeepPartial<ShippingPackagesEntity>) {
    super(input);
  }

  @OneToOne((type) => Order)
  @JoinColumn()
  order: Order;

  @Column('simple-json')
  packages: Array<
    | (Omit<PackageEntity, 'volume'> & {
        productsWeight: number;
        totalWeight: number;
      })
    | null
  >;
}
