import { View, StyleSheet, Image } from 'react-native'
import { Text, IconButton } from 'react-native-paper';

type Props = {
    name: string
    price: number
    brand: string
    background: string
}

function CardCart({ name, price, brand, background }: Props) {
    return (
        <View style={{backgroundColor:`${background}`}}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Image
                        source={{ uri: 'https://dtaconline.dtac.co.th/pub/media/catalog/product/cache/e96373d1c57081d0b326a3dfa1f55e67/p/a/packshot-iphone-15-pro-max-black_20.png' }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <View>
                        <Text>{name}</Text>
                        <Text variant='bodySmall' style={{ color: "gray" }}>{brand}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ color: "red" }}>฿{price}</Text>
                </View>
                <IconButton
                    icon="delete"
                    size={20}
                />
            </View>
        </View>
    )
}

export default CardCart

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    image: {
        width: 60,
        height: 60
    },
    subContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})