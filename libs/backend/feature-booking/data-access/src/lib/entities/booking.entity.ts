import { HotelEntity } from '@akkor-hotel/backend/feature-hotel/data-access';
import { UserEntity } from '@akkor-hotel/backend/feature-user/data-access';
import { Booking } from '@akkor-hotel/shared/api-interfaces';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BookingEntity implements Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { nullable: false})
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => HotelEntity, { nullable: false })
  @JoinColumn()
  hotel: HotelEntity;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
}
