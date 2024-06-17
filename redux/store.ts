import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import  userReducer from "./slices/userSlice"
import cartReducer from "./slices/cartSlice"
import productReducer from "./slices/productSlice"
export const store = configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer,
        product:productReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispacth = ()=>useDispatch<AppDispatch>()
