import { useEffect, useState } from 'react';
import { View,Image } from 'react-native'
import { TextInput, Text, Button } from 'react-native-paper';
import style from './style';
import { login,userSelector,fetchUser,resetErrorMessage } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { useAppDispacth } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStack } from '../../navigation/stackNavigator';
import { fetchCart } from '../../redux/slices/cartSlice';

type Props = NativeStackScreenProps<RootStack,"ProfileStack">

function Login({navigation}:Props) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const [error,setError] = useState<boolean>(false)
    const user = useSelector(userSelector)
    const dispatch = useAppDispacth()

    const handleSubmit = async () => {
        if(!username || !password){
            setError(true)
            return
        }
        setError(false)
        const userData = {username:username,password:password}
        await dispatch(login(userData))
        const access_token = await AsyncStorage.getItem("accessToken")
        if(!access_token){
            return
        }
        await dispatch(fetchUser())
        await dispatch(fetchCart())
        navigation.navigate("HomeStack",{screen:"home"})

    }
 
    useEffect(() => {
        navigation.addListener('focus', () => {
          dispatch(resetErrorMessage())
        });
    
    },[]);

    return (
        <View style={style.container}>
            <Image source={require("../../assets/logo/logo-App.png")}
                        style={{ marginTop: 5,width:200,height:100 }}
            />
            <View style={style.subContainer}>
                <Text variant='titleLarge' style={style.title}>Log in</Text>
                { user.error && <Text variant='labelLarge' style={{color:"red"}}>{user.error}</Text>}
                <TextInput
                    mode='outlined'
                    label="Username"
                    onChangeText={(text)=>setUsername(text)}
                    outlineColor='#bdbdbd'
                    activeOutlineColor='#039be5'
                    selectionColor='black'
                    outlineStyle={{ backgroundColor: "#fafafa"}}
                    error={!username && error}
                />
                <TextInput
                    mode='outlined'
                    label="Password"
                    onChangeText={(text)=>setPassword(text)}
                    secureTextEntry={true}
                    outlineColor='#bdbdbd'
                    activeOutlineColor='#039be5'
                    selectionColor='black'
                    outlineStyle={{ backgroundColor: "#fafafa"}}
                    error={!password && error}
                />
                <Button mode="contained" buttonColor='#ff4c3b' style={{ borderRadius: 5, marginTop: 10 }} onPress={handleSubmit} loading={user.loading}>Continue</Button>
                <View style={style.linkContainer}>
                   <Text style={style.textSignup} onPress={() => navigation.navigate("ProfileStack",{screen:"signup"})}>Sign up</Text>
                    <Text style={style.textSignup}>Forgot your password?</Text>
                </View>
            </View>
        </View>
    )
}

export default Login