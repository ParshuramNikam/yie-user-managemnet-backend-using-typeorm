import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column()
    address: string;

    @Column()
    age: number;

    @Column()
    parentName: string;

    @Column()
    contactNumber: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(()=> User, user=> user.profile)
    user: User;

}