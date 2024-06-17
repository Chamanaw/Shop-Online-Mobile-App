import { View } from 'react-native'
import { Text, Avatar, TextInput, Button } from 'react-native-paper'
import style from './style'

function Profile() {
    return (
        <View style={style.container} >
            <Avatar.Text size={90} label="XD" />
            <Text variant='titleMedium'>Chakphet Wongmanee</Text>
            <Text variant='bodySmall'>Email: king33130h@gmail.com </Text>
            <View style={style.settingContainer}>
                <Text variant='titleMedium'>Setting</Text>
                <View>
                    <Text variant='titleSmall' style={{ color: "#424242" }}>Change username</Text>
                    <TextInput
                        mode='outlined'
                        label="New username"
                        outlineColor='#bdbdbd'
                        activeOutlineColor='#039be5'
                        selectionColor='black'
                        left={<TextInput.Icon icon='account' />}
                        style={{ backgroundColor: "#fafafa" }}
                    />

                    <Button mode="contained" style={style.button} buttonColor='#039be5'>Continue</Button>
                </View>
                <View>
                    <Text variant='titleSmall' style={{ color: "#424242" }}>Change password</Text>
                    <TextInput
                        mode='outlined'
                        label="New password"
                        secureTextEntry={true}
                        outlineColor='#bdbdbd'
                        activeOutlineColor='#039be5'
                        selectionColor='black'
                        left={<TextInput.Icon icon='lock' />}
                        style={{ backgroundColor: "#fafafa" }}
                    />
                    <Button mode="contained" style={style.button} buttonColor='#039be5'>Continue</Button>
                </View>
                <View>
                    <Text variant='titleSmall' style={{ color: "#424242" }}>Change email</Text>
                    <TextInput
                        mode='outlined'
                        label="New email"
                        secureTextEntry={true}
                        style={{ backgroundColor: "#fafafa" }}
                        left={<TextInput.Icon icon='email' />}
                        activeOutlineColor='#039be5'
                        selectionColor='black'
                    />
                    <Button mode="contained" style={style.button} buttonColor='#039be5'>Continue</Button>
                </View>
            </View>


        </View>
    )
}

export default Profile