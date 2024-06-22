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
    const result = await axios.get('/api/cart/getcart')
    return result.data
})

export const addToCart = createAsyncThunk('cart/addtocart',async(items:ProductType)=>{
    await axios.post('/api/cart/addproduct',{product_id:items.product_id})
    return items
})

export const deleteItem = createAsyncThunk('cart/deleteItem',async(product_id:number)=>{
    await axios.delete('/api/cart/deleteitem',{data:{product_id:product_id}})
    return product_id
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
        builder.addMatcher((action)=>action.type.endsWith('/fulfilled'),(state,action:PayloadAction<ProductType[] | ProductType | number>)=>{
            if(action.type.includes("fetchcart")){
                state.cart = action.payload as ProductType[]
            }
            else if(action.type.includes("addtocart")){
                state.cart = [...state.cart,action.payload as ProductType]
            }
            else if (action.type.includes("deleteItem" )){
                const result  = state.cart.filter((ele)=>ele.product_id != action.payload as number)
                state.cart = result
            }
        })
    }
})

export const {} = cartSlice.actions;
export const cartSelector = (store:RootState) => store.cart
export default cartSlice.reducer