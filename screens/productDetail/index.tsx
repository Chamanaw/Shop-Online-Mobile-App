import { View, Image } from 'react-native'
import style from './style'
import { Text, Button } from 'react-native-paper'
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react'

function ProductDetail() {

    return (
        <View style={style.container}>
            <Image
                source={{ uri: "https://dtaconline.dtac.co.th/pub/media/catalog/product/cache/e96373d1c57081d0b326a3dfa1f55e67/p/a/packshot-iphone-15-pro-max-black_20.png" }}
                style={style.image}
                resizeMode='contain'
            />
            <Text variant='titleLarge' style={{ fontWeight: "bold" }}>iPhone 15 ProMax</Text>
            <Text style={{ color: "#616161" }}>Brand: Apple</Text>
            <Text style={{ marginTop: 5 }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo ducimus accusamus laudantium fuga reiciendis, commodi voluptatibus repellat, ab quis accusantium numquam eum animi architecto, atque cumque iste! Enim, accusantium consectetur.</Text>
            <View style={style.buttonContainer}>
                <Button
                     mode="outlined" 
                     textColor='#ff4c3b' 
                     style={style.buttonAddCart}
                     icon='cart-outline'
                >
                    Add to Cart
                </Button>
                <Button 
                    mode="contained" 
                    style={{ borderRadius: 5, width: "50%" }} 
                    buttonColor='#ff4c3b'>Buy now
                </Button>
            </View>
        </View>
    )
}

export default ProductDetail