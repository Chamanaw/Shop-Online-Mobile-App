import { StyleSheet,StatusBar } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


const style = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:"#ffffff"
    },
    image:{
        width:"100%",
        height:300,  
    },
    buttonContainer:{
        flexDirection:"row",
        columnGap:3,
        marginTop:30
    },
    buttonAddCart:{ 
        borderRadius: 5,
        width:"50%",
        color:"red",
        borderColor:"#ff4c3b" 
    }
})

export default style