import { View } from "react-native";
import { TextInput, Text, Button, HelperText } from "react-native-paper";
import style from "./style";
import { useState } from "react";
import DialogSignup from "./dialog";
import { useAppDispacth } from "../../redux/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../navigation/stackNavigator";
import { errorMessage ,errorSignup,signup } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { userSelector ,resetErrorMessage } from "../../redux/slices/userSlice";
import { useEffect } from "react";


type Props = NativeStackScreenProps<RootStack, "LoginStack">;

function Signup({ navigation }: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [matchPass, setMatchPass] = useState("");
    const [email, setEmail] = useState<string>("");
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [err,setErr] = useState<boolean>(false)

    const dispatch = useAppDispacth();
    const user = useSelector(userSelector);

    const handleSubmit = async () => {

        const user_validation = username.match(/\w{5,}/);
        const password_validation = password.match(/\w{5,}/);
        const email_validation = email.match(/\w{5,}\@\w{5,}/);

        if (!user_validation && !password_validation && !email_validation) {
            setErr(true)
            await dispatch(errorSignup("Please complete all fields"))
            return;
        }

        if(password === matchPass){
            const data = {username,password,email}
            await dispatch(signup(data))
            dispatch(errorMessage(''))
        }
        else{
            dispatch(errorMessage("Passwords do not match"))
        }
        setShowDialog(true);

    };

    useEffect(()=>{
        dispatch(resetErrorMessage())
    },[])

    return (
        <>
            <View style={style.container}>
                <Text variant="titleLarge" style={style.title}>
                    Sign up
                </Text>

                {user.errorSignup && <Text variant="bodyMedium" style={{ color: "red" }}>
                    {user.errorSignup}
                </Text>}

                <TextInput
                    mode="outlined"
                    label="Username"
                    style={{ backgroundColor: "#fafafa", zIndex: 0 }}
                    outlineColor="#bdbdbd"
                    activeOutlineColor="#039be5"
                    selectionColor="black"
                    onChangeText={(text) => setUsername(text)}
                    error={(!username && err) ? true : false}
                />
                <HelperText type="info">Can only be used a-z A-Z 0-9</HelperText>
                <TextInput
                    mode="outlined"
                    label="Password"
                    secureTextEntry={true}
                    style={{ backgroundColor: "#fafafa", zIndex: 0 }}
                    outlineColor="#bdbdbd"
                    activeOutlineColor="#039be5"
                    selectionColor="black"
                    onChangeText={(text) => setPassword(text)}
                    error={!password && err? true : false}
                />
                <HelperText type="info">Can only be used a-z A-Z 0-9</HelperText>
                <TextInput
                    mode="outlined"
                    label="Password Again"
                    secureTextEntry={true}
                    style={{ backgroundColor: "#fafafa", zIndex: 0 }}
                    outlineColor="#bdbdbd"
                    activeOutlineColor="#039be5"
                    selectionColor="black"
                    onChangeText={(text) => setMatchPass(text)}
                    error={!matchPass && err ? true : false}
                />
                <HelperText type="info">Enter the passwords to match.</HelperText>
                <TextInput
                    mode="outlined"
                    label="Email"
                    style={{ backgroundColor: "#fafafa", zIndex: 0 }}
                    activeOutlineColor="#039be5"
                    selectionColor="black"
                    onChangeText={(text) => setEmail(text)}
                    error={ !email && err ? true : false}
                />
                <Button
                    mode="contained"
                    style={{ marginTop: 20, borderRadius: 5, zIndex: 0 }}
                    buttonColor="#ff4b3a"
                    onPress={handleSubmit}
                >
                    Continue
                </Button>
                <DialogSignup open={showDialog} setDialog={setShowDialog} navigation={navigation} />
            </View>
        </>
    );
}

export default Signup;
