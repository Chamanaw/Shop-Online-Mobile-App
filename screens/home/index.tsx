import { FlatList,TouchableOpacity} from "react-native"
import CardProduct from "../../components/card"
import uuid from 'react-native-uuid';
import { View, Image } from 'react-native'
import { Text} from 'react-native-paper'
import style from './style'
import Search from "../../components/search";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { useAppDispacth } from "../../redux/store";
import { userSelector } from "../../redux/slices/userSlice";
import { useSelector } from 'react-redux';
import { fetchProduct, productSelector } from "../../redux/slices/productSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../navigation/stackNavigator";

function HearderHomePage() {
    const [headerHeight, setHeaderHeight] = useState<number>();
    const user = useSelector(userSelector)

    const onLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setHeaderHeight(height);
    };

    return (
        <View onLayout={onLayout} >
            <View style={{ height: headerHeight }}>
                <View style={{ paddingLeft: 10, marginVertical: 17 }}>
                    <Text variant="headlineSmall">{(user.user)
                        ? <>Hellow <Ionicons name="hand-left" size={24} color="#FFBF00" />{user.user.user_name}</>
                        : <>Please log in</>}
                    </Text>
                    <Text variant='bodyMedium' style={{ color: "gray" }}>Fiend your best products at your finger</Text>
                </View>
                <View style={{ marginBottom: 5 }}>
                    <Search />
                </View>

                <View style={style.overlay}>
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
                        resizeMode="cover"
                        style={style.image}
                    />
                    <View style={style.textOverlayPosition}>
                        <Text variant="titleLarge" style={style.textOverlay}>WIDE VARIETY OF PRODUCTS</Text>
                        <Text variant="bodySmall" style={style.textOverlay}>Discover a wide variety of products from top brands, including fashion, electronics, and much more.</Text>
                    </View>

                </View>
                <View style={{ marginTop: 15, marginBottom: 10 }}>
                    <Text variant='headlineMedium' style={style.titleProduct}>Products</Text>
                </View>
            </View>
        </View>
    )
}

type Props = NativeStackScreenProps<RootStack, 'HomeStack'>;

function Home({ navigation }:Props) {

    const product = useSelector(productSelector)
    const dispatch = useAppDispacth()

    useEffect(() => {
        dispatch(fetchProduct())
    }, [])


    return (
        <>
            <FlatList
                data={product.products}
                renderItem={({ item }) => (<CardProduct category={item.c_name} name={item.name} price={item.price} image={item.image} product_id={item.product_id} navigation={navigation}/>)}
                keyExtractor={() => uuid.v4().toString()}
                numColumns={2}
                ListHeaderComponent={() => <HearderHomePage />}
                ListHeaderComponentStyle={{ width: '100%' }}
                style={{
                    backgroundColor: '#ffffff',
                    paddingBottom: 120
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 20
                }}
            />
        </>
    )
}

export default Home