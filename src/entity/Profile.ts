import { Entity, PrimaryGeneratedColumn, Column, IsNull } from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

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

}