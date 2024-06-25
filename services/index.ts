import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const pathRequestToken = [
    "/api/user/getuser",
    "/api/cart/getcart",
    "/api/cart/addproduct",
    "/api/cart/deleteitem",
    "/api/user/updateusername",
    "/api/user/updatepassword",
    "/api/user/updateEmail"
]

const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    timeout: 5000,
})

instance.interceptors.request.use(async (config) => {
    const pathToken = pathRequestToken.some((ele) => config.url === ele)
    if (pathToken) {
        const accessToken = await AsyncStorage.getItem('accessToken')
        config.headers.Authorization = "Bearer " + accessToken
    }
    return config
},
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use((response) => {
    return response
},
    async(error) => {
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true
            try{
                const refreshToken = await AsyncStorage.getItem("refreshToken")
                if(refreshToken){
                    const newToken =  await refresh(refreshToken)
                    originalRequest.headers.Authorization = "Bearer "+newToken
                    return await axios(originalRequest)
                    
                }
            }   
            catch(error){
                return Promise.reject(error)
            }

        }

        return Promise.reject(error);
    }   

)


const refresh = async(token:string)=>{
    try{
        const result = await instance.post("/api/refreshtoken",{},{headers:{Authorization:"Brarer "+token}})
        if(result.data.accessToken){
            await AsyncStorage.setItem("accessToken",result.data.accessToken)
            await AsyncStorage.setItem("refreshToken",result.data.refreshToken)
            return result.data.accessToken
        }
    }catch(err){
        return new Error("Unauthorized");
    }
    
}


export default instance