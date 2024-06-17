import { View } from 'react-native'
import { TextInput, Icon, Text, Button, HelperText } from 'react-native-paper';
import style from './style'

function Signup() {
    return (
        <View style={style.container}>
            <Text variant='titleLarge' style={style.title}>Sign up</Text>
            <TextInput
                mode='outlined'
                label="Username"
                style={{ backgroundColor: "#fafafa" }}
                outlineColor='#bdbdbd'
                activeOutlineColor='#039be5'
                selectionColor='black'
                left={<TextInput.Icon icon='account' />}
            />
            <HelperText type='info'>
                Can only be used a-z A-Z 0-9
            </HelperText>
            <TextInput
                mode='outlined'
                label="Password"
                secureTextEntry={true}
                style={{ backgroundColor: "#fafafa" }}
                outlineColor='#bdbdbd'
                activeOutlineColor='#039be5'
                selectionColor='black'
                left={<TextInput.Icon icon='lock' />}
            />
            <HelperText type='info'>
                Can only be used a-z A-Z 0-9
            </HelperText>
            <TextInput
                mode='outlined'
                label="Password Again"
                secureTextEntry={true}
                style={{ backgroundColor: "#fafafa" }}
                outlineColor='#bdbdbd'
                activeOutlineColor='#039be5'
                selectionColor='black'
                left={<TextInput.Icon icon='lock' />}
            />
            <HelperText type='info'>
                Enter the passwords to match.
            </HelperText>
            <TextInput
                mode='outlined'
                label="Email"
                secureTextEntry={true}
                style={{ backgroundColor: "#fafafa" }}
                left={<TextInput.Icon icon='email'/>}
                activeOutlineColor='#039be5'
                selectionColor='black'
            />
            <Button mode="contained" style={{ marginTop: 20,borderRadius:5 }} buttonColor='#ff4b3a'>Continue</Button>
        </View>
    )
}

export default Signup