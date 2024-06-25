
import {StyleSheet } from 'react-native';
import { Button, Dialog, Text } from 'react-native-paper';



interface Props {
    open: boolean,
    setDialog: (newValue: boolean) => void,
    navigation:any
}

const DialogSignup = ({ open, setDialog,navigation }: Props) => {
    return (
        <Dialog visible={open} onDismiss={() => setDialog(false)} style={style.container} >
            <Dialog.Title>Successful</Dialog.Title>
            <Dialog.Content>
                <Text variant="bodyMedium">Your has been sign up successfully.</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={() =>{
                    setDialog(false)
                    navigation.navigate("ProfileStack",{screen:"login"})
                }}> <Text style={style.botton}>Done</Text></Button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default DialogSignup

const style = StyleSheet.create({
    container:{
        backgroundColor:"white"
    },
    botton:{
        color:"#002379"
    }
})