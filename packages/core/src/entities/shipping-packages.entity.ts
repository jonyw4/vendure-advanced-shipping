import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { VendureEntity, DeepPartial, Order } from '@vendure/core';
import Package from './package.entity';

@Entity()
export class ShippingPackagesEntity extends VendureEntity {
  constructor(input?: DeepPartial<ShippingPackagesEntity>) {
    super(input);
  }

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @Column('simple-json')
  packages: Array<
    Omit<Package, 'volume'> & {
      productsWeight: number;
      totalWeight: number;
    }
  >;
}

export default ShippingPackagesEntity;
