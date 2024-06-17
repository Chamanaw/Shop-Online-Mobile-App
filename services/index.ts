import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const pathRequestToken = [
    "/api/user",
    "/api/refreshtoken",
    "/api/cart",
    "/api/addproduct",
    "/api/deleteitem"
]

const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    timeout: 5000,
})

instance.interceptors.request.use(async (config) => {
    const pathToken = pathRequestToken.some((ele) => config.url?.includes(ele))
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
        if(error.response.status === 401 && originalRequest._retry){
            originalRequest._retry = true
            try{
                const refreshtoken = await AsyncStorage.getItem("refreshtoken")
                if(refreshtoken){
                    const newToken =  await refresh(refreshtoken)
                    originalRequest.headers.Authorization = "Bearer "+newToken
                    await axios.get(originalRequest)
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
    return await axios.post("/api/refreshtoken")
}


export default instance