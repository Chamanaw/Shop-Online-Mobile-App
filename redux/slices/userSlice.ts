import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserType,defaultValueUser } from "../../types";
import axios from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";


type UserState = {
    user:UserType | null,
    loading:boolean,
    error:string,
}
const initialState:UserState = {
    user:null,
    loading:false,
    error:'',
}
interface UserLogin{
    username:string,
    password:string
}

export const fetchUser = createAsyncThunk('user/fetchuser',async()=>{
    const response = await axios.get('/api/user')
    return response.data
})
export const login = createAsyncThunk('user/login',async(payload:UserLogin)=>{
    const response = await axios.post('/api/login',payload)
    if(response.data.accessToken){
        await AsyncStorage.setItem('accessToken',response.data.accessToken)
        await AsyncStorage.setItem('refreshToken',response.data.refreshToken)
        return true
    }
    return false
})

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        errorMessage:(state,action:PayloadAction<string>)=>{
            state.error = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addMatcher((action)=>action.type.endsWith("/pending"),(state)=>{
            state.loading = true
        })
        builder.addMatcher((action)=>action.type.endsWith("/fulfilled"),(state,action:PayloadAction<UserType| boolean>)=>{
            state.loading = false
            if(action.type.includes('fetchuser')){
                state.user = action.payload as UserType
                state.error = ''
            }
            else if(action.type.includes('login')){
                state.error = ''
            }
            
        })
        builder.addMatcher((action)=>action.type.endsWith("/rejected"),(state:UserState,action)=>{
            state.loading = false
            if(action.type.includes("login")){
                state.error = " User not find"
            }
        })
        
    }
})


export const {errorMessage} = userSlice.actions
export const userSelector = (store:RootState)=>store.user
export default userSlice.reducer

