import { useEffect, useState } from 'react';
import { View,Image } from 'react-native'
import { TextInput, Text, Button } from 'react-native-paper';
import style from './style';
import { login,userSelector,fetchUser,errorMessage, resetErrorMessage } from '../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { useAppDispacth } from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStack } from '../../navigation/stackNavigator';

type Props = NativeStackScreenProps<RootStack,"LoginStack">

function Login({navigation}:Props) {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const user = useSelector(userSelector)
    const dispatch = useAppDispacth()

    const handleSubmit = async () => {
        const inputEmpty = username.match(/\w{4,}/) && password.match(/\w{4,}/)
        if(!inputEmpty){
            await dispatch(errorMessage("Please enter your username or password."))
            return
        }
        const userData = {username:username,password:password}
        await dispatch(login(userData))
        const access_token = await AsyncStorage.getItem("accessToken")
        if(!access_token){
            return
        }
        await dispatch(fetchUser())

    }

    useEffect(()=>{
        dispatch(resetErrorMessage())
    },[])

    return (
        <View style={style.container}>
            <Image source={{ uri: "https://img.freepik.com/free-vector/detailed-click-collect-sign_23-2148779338.jpg?t=st=1713121176~exp=1713124776~hmac=2e3137ed87253b1b1c9985b1af639ac6cc96f72425e81bb4db9e98c93ba475d2&w=1380" }}
                        width={200}
                        height={50}
                        style={{ marginTop: 5 }}
            />
            <View style={style.subContainer}>
                <Text variant='titleLarge' style={style.title}>Log in</Text>
                { user.error && <Text variant='labelLarge' style={{color:"red"}}>{user.error}</Text>}
                <TextInput
                    mode='outlined'
                    label="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    outlineColor='#bdbdbd'
                    activeOutlineColor='#039be5'
                    selectionColor='black'
                    outlineStyle={{ backgroundColor: "#fafafa"}}
                />
                <TextInput
                    mode='outlined'
                    label="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    outlineColor='#bdbdbd'
                    activeOutlineColor='#039be5'
                    selectionColor='black'
                    outlineStyle={{ backgroundColor: "#fafafa"}}
                />
                <Button mode="contained" buttonColor='#ff4c3b' style={{ borderRadius: 5, marginTop: 10 }} onPress={handleSubmit} loading={user.loading}>Continue</Button>
                <View style={style.linkContainer}>
                   <Text style={style.textSignup} onPress={() => navigation.navigate("LoginStack",{screen:"signup"})}>Sign up</Text>
                    <Text style={style.textSignup}>Forgot your password?</Text>
                </View>
            </View>
        </View>
    )
}

export default Login