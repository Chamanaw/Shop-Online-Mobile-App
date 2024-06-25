import { StyleSheet,StatusBar } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


const style = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:"#fff",
        flex:1,
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
        borderColor:"#002379" 
    }
})

export default style