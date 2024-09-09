export type CreateUserParams = {
    username: string,
    password: string
}

export type UpdateUserParams = {
    username: string,
    password: string
}

export type UserProfileParams = {
    id : number

    firstname : string

    lastname : string
    
    age : number

    dob : string
}

export type UserPostParams= {
    title: string
    description: string
}