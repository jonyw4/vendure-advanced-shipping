import { Entity, Column } from 'typeorm';
import { VendureEntity, DeepPartial } from '@vendure/core';
import { MassUnit, DistanceUnit } from '../types/generated-admin-schema';
import { convertUnits } from '../utils';

@Entity()
export class PackageEntity extends VendureEntity {
  constructor(input?: DeepPartial<PackageEntity>) {
    super(input);
  }

  @Column()
  name: string;

  @Column()
  massUnit: MassUnit;

  @Column()
  distanceUnit: DistanceUnit;

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

  volume(distanceUnit: DistanceUnit = this.distanceUnit) {
    // Return default response;
    if (distanceUnit === this.distanceUnit) {
      return this.height * this.width * this.length;
    }
    // Convert all fields
    const height = convertUnits(this.height)
      .from(this.distanceUnit)
      .to(distanceUnit);
    const width = convertUnits(this.width)
      .from(this.distanceUnit)
      .to(distanceUnit);
    const length = convertUnits(this.length)
      .from(this.distanceUnit)
      .to(distanceUnit);

    return height * width * length;
  }
}
