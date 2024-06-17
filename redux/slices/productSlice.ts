import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductType,defaultValueProduct } from "../../types";
import axios from "../../services";

type ProductState = {
    products:ProductType[]
    currentProduct:ProductType
    error:string
    loading:boolean
}

const initialState:ProductState = {
    products:[],
    currentProduct:defaultValueProduct,
    error:'',
    loading:false
}

export const fetchProduct = createAsyncThunk("products/fetchproducts",async()=>{
    const response = await axios.get('/api/allproduct')
    return response.data
})

export const fetchDetailProduct = createAsyncThunk("products/fetchDetailProduct",async(payload:string)=>{
    const response = await axios.get("/"+payload)
    return response.data[0] 
})

const productSlice = createSlice({
    name:'products',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addMatcher((action)=>action.type.endsWith('/pending'),(state)=>{
            state.loading = true
        })
        builder.addMatcher((action)=>action.type.endsWith('/fulfilled'),(state:ProductState,action:PayloadAction<ProductType[]>)=>{
            state.loading = false
            if(action.type.includes("fetchproducts")){
                state.products = action.payload 
            }
            else if(action.type.includes("fetchDetailProduct")){
                state.currentProduct = action.payload[0] 
            }
        })
        builder.addMatcher((action)=>action.type.endsWith("/rejected"),(state)=>{
            state.loading = false
            state.error = "No data"
        })
        builder.addCase
    }
})

export const {  } = productSlice.actions
export const productSelector = (store:RootState)=>store.product
export default productSlice.reducer