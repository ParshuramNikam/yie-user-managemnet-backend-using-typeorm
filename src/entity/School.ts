import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Institute } from "./Institute";
import { User } from "./User";

@Entity()
export class School extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Institute, institute => institute.schools)
    institute: Institute;

    @OneToMany(() => User, user => user.school)
    users: User[];

}