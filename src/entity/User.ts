import { IsEmail, IsEnum, Length } from 'class-validator';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import UserRoles from '../Data/UserRoles';
// import Model from './Model';
import bcrypt from 'bcrypt';
import { Profile } from "./Profile";
import { School } from './School';
// import { School } from './School';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  // @Length(4, 30)
  username: string

  @Column()
  @Length(1, 255)
  @IsEmail()
  email: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: 'student',
  })
  @IsEnum(UserRoles)
  role: string

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @ManyToOne( ()=> School, school => school.users)
  school: School[];

  @BeforeInsert()
  createHashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  // @ManyToOne(() => School, school => school.users)
  // school: School;
}
