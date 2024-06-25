import { View } from "react-native";
import { TextInput, Text, Button, HelperText } from "react-native-paper";
import style from "./style";
import DialogSignup from "./dialog";
import { useAppDispacth } from "../../redux/store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../navigation/stackNavigator";
import { errorMessage,signup,userSelector ,resetErrorMessage  } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useEffect ,useState } from "react";


type Props = NativeStackScreenProps<RootStack, "ProfileStack">;

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
        if(!username || !password || !email) {
            setErr(true)
            return;
        }

        setErr(false)
        if(password === matchPass){
            const data = {username,password,email}
            await dispatch(signup(data))
            await dispatch(errorMessage(''))
            setShowDialog(true);
        }
        else{
            setMatchPass('')
            setErr(true)
        }
        

    };

    return (
        <>
            <View style={style.container}>
                <Text variant="titleLarge" style={style.title}>
                    Sign up
                </Text>
                <TextInput
                    mode="outlined"
                    label="Username"
                    style={{ backgroundColor: "#fafafa", zIndex: 0 }}
                    outlineColor="#bdbdbd"
                    activeOutlineColor="#039be5"
                    selectionColor="black"
                    onChangeText={(text) =>text.match(/\w{5,}/)?setUsername(text):setUsername('')}
                    error={(!username && err) ? true : false}
                />
                <HelperText type="info">Can only be used a-z A-Z 0-9 more than 5 character</HelperText>
                <TextInput
                    mode="outlined"
                    label="Password"
                    secureTextEntry={true}
                    style={{ backgroundColor: "#fafafa", zIndex: 0 }}
                    outlineColor="#bdbdbd"
                    activeOutlineColor="#039be5"
                    selectionColor="black"
                    onChangeText={(text) =>text.match(/\w{5,}/)?setPassword(text):setPassword('')}
                    error={!password && err? true : false}
                />
                <HelperText type="info">Can only be used a-z A-Z 0-9 more than 5 character</HelperText>
                <TextInput
                    mode="outlined"
                    label="Password Again"
                    secureTextEntry={true}
                    style={{ backgroundColor: "#fafafa", zIndex: 0 }}
                    outlineColor="#bdbdbd"
                    activeOutlineColor="#039be5"
                    selectionColor="black"
                    onChangeText={(text) =>setMatchPass(text)}
                    error={!matchPass && err ? true : false}
                />
                <HelperText type="info">Enter the passwords to match.</HelperText>
                <TextInput
                    mode="outlined"
                    label="Email"
                    style={{ backgroundColor: "#fafafa", zIndex: 0 }}
                    activeOutlineColor="#039be5"
                    selectionColor="black"
                    onChangeText={(text) =>text.match(/\w{5,}\@\w{5,}/)?setEmail(text):setEmail('')}
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
