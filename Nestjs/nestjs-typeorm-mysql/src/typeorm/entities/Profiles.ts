import { profile } from "console";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_profile')
export class Profiles {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    firstname : string

    @Column()
    lasttname : string
    
    @Column()
    age : number

    @Column()
    dob : string

}