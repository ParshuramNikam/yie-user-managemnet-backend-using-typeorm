import { Length } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { School } from "./School";
// import { School } from "./School";

@Entity()
export class Institute extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column()
    @Length(1, 255)
    name: string;

    @Column()
    address: string;

    @OneToMany(() => School, school => school.institute)
    schools: School[];
}