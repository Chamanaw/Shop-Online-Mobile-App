import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductType, defaultValueProduct } from "../../types";
import axios from "../../services";

type ProductState = {
    products: ProductType[]
    currentProduct: ProductType
    error: string
    loading: boolean
}

const initialState: ProductState = {
    products: [],
    currentProduct: defaultValueProduct,
    error: '',
    loading: false
}

export const fetchProduct = createAsyncThunk("products/fetchproducts", async () => {
    const result = await axios.get('/api/products/allproduct')
    return result.data
})

const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        current: (state, action: PayloadAction<ProductType>) => {
            state.currentProduct = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher((action) => action.type.endsWith('/pending'), (state) => {
            state.loading = true
        })
        builder.addMatcher((action) => action.type.endsWith('/fulfilled'), (state: ProductState, action: PayloadAction<ProductType[]>) => {
            state.loading = false
            if (action.type.includes("fetchproducts")) {
                state.products = action.payload
            }
        })
        builder.addMatcher((action) => action.type.endsWith("/rejected"), (state) => {
            state.loading = false
            state.error = "No data"
        })
        builder.addCase
    }
})

export const { current } = productSlice.actions
export const productSelector = (store: RootState) => store.product
export default productSlice.reducer