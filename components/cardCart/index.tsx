import { View, StyleSheet, Image } from 'react-native'
import { Text, IconButton } from 'react-native-paper';
import { useAppDispacth } from '../../redux/store';
import { deleteItem } from '../../redux/slices/cartSlice';
import { ProductType } from '../../types';
import axios from '../../services';

type Props = {
    items:ProductType
    background:string
}

function CardCart({items,background}: Props) {

    const dispatch = useAppDispacth()

    const handeleRemoveItem = async()=>{
        await dispatch(deleteItem(items.product_id))
    }

    return (
        <View style={{backgroundColor:`${background}`}}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Image
                        source={{uri:axios.getUri()+items.image}}
                        style={styles.image}
                        resizeMode='contain'
                    />
                    <View>
                        <Text>{items.name}</Text>
                        <Text variant='bodySmall' style={{ color: "gray" }}>{items.brand}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ color: "red" }}>฿{items.price}</Text>
                </View>
                <IconButton
                    icon="delete"
                    size={20}
                    onPress={handeleRemoveItem}
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
        alignItems: "center",
        width:130
    }
})