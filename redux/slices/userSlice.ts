import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserType, defaultValueUser } from "../../types";
import axios from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";


type UserState = {
    user: UserType
    loading: boolean,
    error: string,
    success:boolean
}
const initialState: UserState = {
    user: defaultValueUser,
    loading: false,
    error: '',
    success: false
}
interface UserLogin {
    username: string,
    password: string
}
interface UserSigup {
    username: string
    password: string
    email: string
}

export const fetchUser = createAsyncThunk('user/fetchuser', async () => {
    const result = await axios.get('/api/user/getuser')
    return result.data
})
export const login = createAsyncThunk('user/login', async (payload: UserLogin) => {
    const result = await axios.post('/api/login', payload)
    if (result.data.accessToken) {
        await AsyncStorage.setItem('accessToken', result.data.accessToken)
        await AsyncStorage.setItem('refreshToken', result.data.refreshToken)
        return true
    }
    return false
})
export const signup = createAsyncThunk('/user/signup', async (payload: UserSigup) => {
    await axios.post('/api/user/signup', payload)
})

export const updateUsername = createAsyncThunk('/user/updateusername',async (payload:string)=>{
    await axios.patch('/api/user/updateusername',{newUsername:payload})
    return payload
})

export const updatePassword = createAsyncThunk('user/updatepassword', async (payload:string)=>{
    await axios.patch('/api/user/updatepassword',{newPassword:payload})
})

export const updateEmail = createAsyncThunk('user/updateEmail', async (payload:string)=>{
    await axios.patch('/api/user/updateEmail',{newEmail:payload})
    return payload
})

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        errorMessage: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        resetErrorMessage:(state)=>{
            state.error = ''
        },
        resetState:(state)=>{
            return {...state,...initialState}
        },
        resetSuccess:(state)=>{
            state.success = false
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher((action) => action.type.endsWith("/pending"), (state) => {
            state.loading = true
        })
        builder.addMatcher((action) => action.type.endsWith("/fulfilled"), (state, action: PayloadAction<UserType | string>) => {
            state.loading = false
            state.error = ''
            
            if (action.type.includes('fetchuser')) {
                state.user = action.payload as UserType
            }
            else if (action.type.includes('updateusername')){
                state.user = {...state.user,user_name:action.payload as string}
                state.success = true
            }
            else if (action.type.includes('updateEmail')){
                state.user = {...state.user,email:action.payload as string}
                state.success = true
            }
            else if (action.type.includes("updatepassword")){
                state.success = true
            }
        })
        builder.addMatcher((action) => action.type.endsWith("/rejected"), (state: UserState, action) => {
            state.loading = false
            state.success = false
            if (action.type.includes("login")) {
                state.error = "Username or password is incorrect."
            }
           
        })

    }
})


export const { errorMessage,resetErrorMessage,resetState,resetSuccess } = userSlice.actions
export const userSelector = (store: RootState) => store.user
export default userSlice.reducer

