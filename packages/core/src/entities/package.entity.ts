import { Entity, Column } from 'typeorm';
import { VendureEntity, DeepPartial } from '@vendure/core';

@Entity()
export class PackageEntity extends VendureEntity {
  constructor(input?: DeepPartial<PackageEntity>) {
    super(input);
  }

  @Column()
  name: string;

  @Column()
  massUnit: string;

  @Column()
  distanceUnit: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  length: number;

  @Column()
  weight: number;

  @Column()
  enabled: boolean;
}

export default PackageEntity;
