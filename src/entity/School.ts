import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Institute } from "./Institute";
import { User } from "./User";

@Entity()
export class School extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;


    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date


    @ManyToOne(() => Institute, institute => institute.schools, {
        cascade: true
    })
    institute: Institute;

    // one schoolId having multiple students
    @OneToMany(() => User, user => user.school)
    users: User[];

}