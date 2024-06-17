import{StyleSheet} from 'react-native'

const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        rowGap:5,
        alignItems:'center',
        backgroundColor:"#ffffff"
        
    },
    title:{
        fontWeight:'bold'
    },
    subContainer:{
        width: '100%',
        rowGap:5,
        padding:20,
        marginBottom:10
    },
    textSignup:{
        color:'#0277bd',
        fontWeight:'600',
    },
    linkContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:10,
    
    }
})

export default style