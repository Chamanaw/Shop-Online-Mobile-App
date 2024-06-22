import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        rowGap: 10,
        paddingTop: 30,
        
    },
    settingContainer: {
        width: "90%",
        rowGap:10,
        marginTop:30,
        paddingBottom:20
    },
    button: { 
        marginTop: 5,
        borderRadius: 5,
        width: 150, 
        backgroundColor:"#002278"
    },
    buttonLogout:{
        borderRadius: 5,
        backgroundColor:"red"
    }
})

export default style