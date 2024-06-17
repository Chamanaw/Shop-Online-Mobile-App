
import { Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import axios from "../../services"

type Props = {
    category: string
    name: string
    price: number
    image:string
    product_id:number
    
}

function CardProduct({ category, name, price,image ,product_id}: Props) {

  
    return (
        <View >
            <Card style={style.container} 
                mode='contained'
            >
                <Card.Cover
                    source={{ uri:axios.getUri() + image  }}
                    style={style.image}
                    resizeMode='contain'
                />
                <Card.Content style={{paddingLeft:0,paddingBottom:0}}>
                    <Text variant="labelMedium" style={{color:"gray"}}>{category}</Text> 
                    <Text variant="labelLarge" >{name}</Text>
                    <Text style={{color:"#ff4c3b"}}>฿ {price}</Text>
                </Card.Content>
            </Card>
        </View>
    )
}

export default CardProduct

const style = StyleSheet.create({
    container: {
        width: 170,
        borderRadius: 5,
        margin: 8,
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