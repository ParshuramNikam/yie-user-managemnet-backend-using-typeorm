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

  // one user having only one profile
  @OneToOne(() => Profile,  profile => profile.user, {
      // cascade: true,
      onDelete: "CASCADE"
    })
    @JoinColumn()
    profile: Profile;

  // many students can have same schoolId
  @ManyToOne(() => School, school => school.users)
  @JoinColumn()
  school: School;

  @BeforeInsert()
  createHashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  // @ManyToOne(() => School, school => school.users)
  // school: School;
}
