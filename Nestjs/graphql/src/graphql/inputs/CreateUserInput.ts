import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class createUserInput {
    
    @Field()
    username: string 
    
    @Field({nullable:  true})
    displayName?: string 

}