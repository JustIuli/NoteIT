export interface User {
    _id:string
    email:string
    password:string
    name:string
}

export interface NoteTags {
    id:string
    content:string
    color:string
}
export interface Note {
    _id:string
    excerpt:string
    body:string
    title:string
    deleted:boolean
    pinned:boolean
    createdBy:string
    tags:NoteTags[]
    createdAt:string
    updatedAt:string
}