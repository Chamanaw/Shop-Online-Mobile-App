import { View, ScrollView } from "react-native";
import {
    Text,
    Avatar,
    TextInput,
    Button,
    HelperText,
    Portal, 
    Provider 
} from "react-native-paper";
import {
    updateEmail,
    updatePassword,
    updateUsername,
} from "../../redux/slices/userSlice";
import style from "./style";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import axios from "../../services";
import SnackbarProfile from "./snackbar";
import { useEffect, useState } from "react";
import { useAppDispacth } from "../../redux/store";


function Profile() {
    const { user, success, loading } = useSelector(userSelector);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const [newEmail, setNewEmail] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [element, setElement] = useState<number>(0);
    const dispatch = useAppDispacth();

    const handleChangeUsername = async (ele: number) => {
        setElement(ele);
        if (!newUsername) {
            setError(true);
            return;
        }
        setError(false);
        await dispatch(updateUsername(newUsername));
    };

    const handleChangePassword = async (ele: number) => {
        setElement(ele);
        if (!newPassword) {
            setError(true);
            return;
        }
        setError(false);
        await dispatch(updatePassword(newPassword));
    };

    const handleChangeEmail = async (ele: number) => {
        setElement(ele);
        if (!newEmail) {
            setError(true);
            return;
        }
        setError(false);
        await dispatch(updateEmail(newEmail));
    };

    useEffect(() => {
        if (success) {
            setShowDialog(true);
        }
    }, [success]);

    return (
        <Provider>
            <ScrollView style={{ backgroundColor: "#fff" }}>
                <View style={style.container}>
                    <Avatar.Image
                        size={130}
                        source={{ uri: axios.getUri() + user?.image }}
                    />
                    <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                        {user?.user_name.toUpperCase()}
                    </Text>
                    <Text variant="bodyLarge">
                        <Text variant="titleMedium">Email:</Text> {user?.email}
                    </Text>
                    <View style={style.settingContainer}>
                        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                            Setting
                        </Text>
                        <View>
                            <Text variant="bodyLarge" style={{ color: "#424242" }}>
                                Change username
                            </Text>
                            <TextInput
                                mode="outlined"
                                label="New username"
                                outlineColor="#bdbdbd"
                                activeOutlineColor="#039be5"
                                selectionColor="black"
                                style={{ backgroundColor: "#fafafa" }}
                                onChangeText={(text) =>
                                    text.match(/\w{5,}/)
                                        ? setNewUsername(text)
                                        : setNewUsername("")
                                }
                                error={!newUsername && error && element == 1 ? true : false}
                            />
                            <HelperText type="info">
                                Can only be used a-z A-Z 0-9 more than 5 character
                            </HelperText>
                            <Button
                                mode="contained"
                                style={style.button}
                                buttonColor="#039be5"
                                loading={element === 1 && loading}
                                onPress={() => handleChangeUsername(1)}
                            >
                                Continue
                            </Button>
                        </View>
                        <View>
                            <Text variant="bodyLarge" style={{ color: "#424242" }}>
                                Change password
                            </Text>
                            <TextInput
                                mode="outlined"
                                label="New password"
                                secureTextEntry={true}
                                outlineColor="#bdbdbd"
                                activeOutlineColor="#039be5"
                                selectionColor="black"
                                style={{ backgroundColor: "#fafafa" }}
                                onChangeText={(text) =>
                                    text.match(/\w{5,}/)
                                        ? setNewPassword(text)
                                        : setNewPassword("")
                                }
                                error={!newPassword && error && element == 2 ? true : false}
                            />
                            <HelperText type="info">
                                Can only be used a-z A-Z 0-9 more than 5 character
                            </HelperText>
                            <Button
                                mode="contained"
                                style={style.button}
                                buttonColor="#039be5"
                                loading={element === 2 && loading}
                                onPress={() => handleChangePassword(2)}
                            >
                                Continue
                            </Button>
                        </View>
                        <View>
                            <Text variant="bodyLarge" style={{ color: "#424242" }}>
                                Change email
                            </Text>
                            <TextInput
                                mode="outlined"
                                label="New email"
                                style={{ backgroundColor: "#fafafa", marginBottom: 10 }}
                                activeOutlineColor="#039be5"
                                selectionColor="black"
                                onChangeText={(text) =>
                                    text.match(/\w{5,}\@\w{5,}/)
                                        ? setNewEmail(text)
                                        : setNewEmail("")
                                }
                                error={!newEmail && error && element == 3 ? true : false}
                            />
                            <Button
                                mode="contained"
                                style={style.button}
                                buttonColor="#039be5"
                                loading={element === 3 && loading}
                                onPress={() => handleChangeEmail(3)}
                            >
                                Continue
                            </Button>
                        </View>
                    </View>
                </View>
                <Portal>
                    <SnackbarProfile open={showDialog} setDismiss={setShowDialog} />
                </Portal>
            </ScrollView>
        </Provider>
    );
}

export default Profile;
