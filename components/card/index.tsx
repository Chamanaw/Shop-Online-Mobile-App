
import { Card, Text } from 'react-native-paper';
import { StyleSheet,TouchableOpacity  } from 'react-native';
import axios from "../../services"
import { ProductType } from '../../types';

type Props = {
    dataProduct:ProductType
    navigation:any
    stack:string
}

function CardProduct({ dataProduct,navigation,stack}: Props) {
    const {product_id,image,name,price,c_name} = dataProduct
    return (
        <TouchableOpacity onPress={()=>navigation.navigate(stack,{screen:'productDetail',params:{product_id:product_id}})}>
            <Card style={style.container} 
                mode='contained'
            >
                <Card.Cover
                    source={{ uri:axios.getUri() + image  }}
                    style={style.image}
                    resizeMode='contain'
                />
                <Card.Content style={{paddingLeft:0,paddingBottom:0}}>
                    <Text variant="labelMedium" style={{color:"gray"}}>{c_name}</Text> 
                    <Text variant="labelLarge" >{name}</Text>
                    <Text style={{color:"#ff4c3b"}}>฿ {price}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

export default CardProduct

const style = StyleSheet.create({
    container: {
        width: 170,
        borderRadius: 5,
        marginBottom:10,
        marginTop:0,
        backgroundColor:"white",
        
    },
    image:{
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor:"#f0f0f0",
        height:170,
        padding:10
    }
})