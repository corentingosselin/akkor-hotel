import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { User } from '@akkor-hotel/shared/api-interfaces';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  pseudo: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at!: Date;
    
  @UpdateDateColumn()
  updated_at!: Date;
}
