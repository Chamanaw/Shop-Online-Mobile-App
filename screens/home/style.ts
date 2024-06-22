import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        width:"100%",
        height:300
    },
    overlay:{
        position:"relative",
        justifyContent:"center",
        alignItems:"center",
        
    },
    textOverlayPosition:{
        position:"absolute",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"rgba(0, 0, 0, 0.5)",
        width:"100%",
        height:"100%",
    },
    textOverlay:{
        color:"white",
        fontWeight:"bold"
    },
    titleProduct:{
        paddingLeft:15,
        fontWeight:"bold",
    },

})

export default style