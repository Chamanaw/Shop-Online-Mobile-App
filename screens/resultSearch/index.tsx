import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import style from "./style";
import CardProduct from "../../components/card";
import uuid from "react-native-uuid";
import { useSelector } from "react-redux";
import { productSelector } from "../../redux/slices/productSlice";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStack } from "../../navigation/stackNavigator";
import { useEffect, useState } from "react";
import { ProductType } from "../../types";

type Search = NativeStackScreenProps<RootStack, "SearchStack">;
interface Props {
    query: string;
}

function HeaderResultSearch({ query }: Props) {
    return (
        <View >
            <Text variant="titleMedium" style={style.text}>
                Result for "
                {
                    <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                        {query}
                    </Text>
                }
                "
            </Text>
        </View>
    );
}

function ResultSearch({ route, navigation }: Search) {
    const query: string = route.params?.keyword;
    const { products } = useSelector(productSelector);
    const [result, setResult] = useState<ProductType[]>([]);

    useEffect(() => {
        const keyword = query.replace(" ", "").toLowerCase();
        const findProduct = products.filter((ele) =>
            ele.name.replace(" ", "").toLowerCase().includes(keyword)
        );
        setResult([...findProduct]);
    }, [query]);

    return (
        <FlatList
            data={result}
            renderItem={({ item }) => (
                <CardProduct
                    dataProduct={item}
                    navigation={navigation}
                    stack="SearchStack"
                />
            )}
            keyExtractor={() => uuid.v4().toString()}
            numColumns={2}
            ListHeaderComponent={()=><HeaderResultSearch query={query}/>}
            style={{
                backgroundColor:'#ffffff',
                paddingBottom: 120,
                
            }}
            contentContainerStyle={{
                alignItems: "center",
            }}
            ListHeaderComponentStyle={{
                width:"100%"
            }}
            columnWrapperStyle={{gap:10}}
        />
    );
}

export default ResultSearch;
