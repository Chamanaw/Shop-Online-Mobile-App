import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductType } from "../../types";
import axios from "../../services";


type cartState = {
    cart:ProductType[],
    loading:boolean,
    error:string
}
const initialState:cartState = {
    cart:[],
    loading:false,
    error:''
}

export const fetchCart = createAsyncThunk('cart/fetchcart',async()=>{
    const response = await axios.get('/api/cart')
    return response.data
})

export const addToCart = createAsyncThunk('cart/addtocart',async(product_id:number)=>{
    const response = await axios.post('/api/addproduct')
    return response.data
})

export const deleteItem = createAsyncThunk('cart/deleteitem',async(product_id:number)=>{
    const response = await axios.delete('/api/deleteitem')
    return response.data
})

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        
        builder.addMatcher((action)=>action.type.endsWith('/pending'),(state)=>{
            state.loading = true
        })
        builder.addMatcher((action)=>action.type.endsWith('/rejected'),(state,action)=>{
            state.loading = false
            state.error = 'error'
        })
        builder.addMatcher((action)=>action.type.endsWith('/fulfilled'),(state,action:PayloadAction<ProductType[] | ProductType>)=>{
            if(action.type.includes("fetchcart")){
                state.cart = action.payload as ProductType[]
            }
            else if(action.type.includes("addtocart")){
                state.cart.push(action.payload as ProductType)
            } 
        })
    }
})

export const {} = cartSlice.actions;
export const cartSelector = (store:RootState) => store.cart
export default cartSlice.reducer