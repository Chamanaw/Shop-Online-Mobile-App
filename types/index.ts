
export interface ProductType{
    product_id:number
    name:string
    description:string
    price:number
    stock_quantity:number
    color:string
    memory:number
    c_name:string
    image:string
    brand:string
}

export interface UserType{
    user_name:string
    email:string
    image:string
}

export const defaultValueUser = {
    user_name:'',
    email:'',
    image:''
}

export const defaultValueProduct = {
    product_id:0,
    name:'',
    description:'',
    price:0,
    stock_quantity:0,
    color:'',
    memory:0,
    c_name:'',
    image:'',
    brand:''
}
