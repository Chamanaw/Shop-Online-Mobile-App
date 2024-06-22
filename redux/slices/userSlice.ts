import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserType, defaultValueUser } from "../../types";
import axios from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";


type UserState = {
    user: UserType | null,
    loading: boolean,
    error: string,
    dialogSignup: boolean,
    errorSignup:string
}
const initialState: UserState = {
    user: null,
    loading: false,
    error: '',
    dialogSignup: false,
    errorSignup:''
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



const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        errorMessage: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setDialogSignup:(state,action:PayloadAction<boolean>)=>{
            state.dialogSignup =action.payload
        },
        errorSignup:(state,action: PayloadAction<string>)=>{
            state.errorSignup = action.payload  
        },
        resetErrorMessage:(state)=>{
            state.errorSignup = ''
            state.error = ''
        },
        resetState:(state)=>{
            state.user= null
            state.error=''
            state.errorSignup=''
            state.dialogSignup=false
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher((action) => action.type.endsWith("/pending"), (state) => {
            state.loading = true
        })
        builder.addMatcher((action) => action.type.endsWith("/fulfilled"), (state, action: PayloadAction<UserType>) => {
            state.loading = false
            if (action.type.includes('fetchuser')) {
                state.user = action.payload as UserType
                state.error = ''
                state.loading = false
            }
            else if (action.type.includes('login')) {
                state.error = ''
                state.loading = false
            }
            else if (action.type.includes('signup')) {
                state.dialogSignup = true
                state.error = ''
                state.loading = false
            }

        })
        builder.addMatcher((action) => action.type.endsWith("/rejected"), (state: UserState, action) => {
            state.loading = false
            if (action.type.includes("login")) {
                state.error = " User not find"
            }
        })

    }
})


export const { errorMessage,setDialogSignup,errorSignup,resetErrorMessage,resetState } = userSlice.actions
export const userSelector = (store: RootState) => store.user
export default userSlice.reducer

