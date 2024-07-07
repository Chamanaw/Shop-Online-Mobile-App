import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        rowGap: 3,
        paddingTop: 30,
        
    },
    settingContainer: {
        width: "90%",
        rowGap:20,
        marginTop:10,
        paddingBottom:80
    },
    button: { 
        marginTop: 5,
        borderRadius: 5,
        width: 150, 
        backgroundColor:"#002278",
    },
    buttonLogout:{
        borderRadius: 5,
        backgroundColor:"red"
    }
})

export default style