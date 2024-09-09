import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Profiles } from './Profiles';
import { Posts } from './Post';


@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id : number;

    @Column( {unique: true} )
    username: string

    @Column()
    password: string

    @Column()
    createdAt: Date

    @Column({nullable: true})
    authStategy: string

    @OneToOne(() => Profiles)
    @JoinColumn()
    profile : Profiles

    @OneToMany( () => Posts, (post) => post.user)
    posts: Posts[]
}