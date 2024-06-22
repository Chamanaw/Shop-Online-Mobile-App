import { View, Image, ScrollView } from "react-native";
import style from "./style";
import { Text, Button } from "react-native-paper";
import { useEffect } from "react";
import { productSelector } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../navigation/stackNavigator";
import { current } from "../../redux/slices/productSlice";
import { useAppDispacth } from "../../redux/store";
import { addToCart } from "../../redux/slices/cartSlice";

type Props = NativeStackScreenProps<RootStack, "HomeStack">;

function ProductDetail({ route }: Props) {
  const p_id = route.params?.product_id;
  const { products, currentProduct } = useSelector(productSelector);
  const dispatch = useAppDispacth();

  const addProduct = async()=>{
      await dispatch(addToCart(currentProduct))
  }

  useEffect(() => {
    let result = products.filter((ele) => ele.product_id === p_id);
    dispatch(current(result[0]));
  }, [p_id]);
  return (
    <ScrollView>
      <View style={style.container}>
        <Image
          source={{ uri: axios.getUri() + currentProduct.image }}
          style={style.image}
          resizeMode="contain"
        />
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          {currentProduct.name}
        </Text>
        <Text style={{ color: "#616161" }}>Brand:{currentProduct.brand}</Text>
        <Text style={{ marginTop: 5 }}>{currentProduct.description}</Text>
        <View style={style.buttonContainer}>
          <Button
            mode="outlined"
            textColor="#002379"
            style={style.buttonAddCart}
            icon="cart-outline"
            onPress={addProduct}
          >
            Add to Cart
          </Button>
          <Button
            mode="contained"
            style={{ borderRadius: 5, width: "50%" }}
            buttonColor="#002379"
          >
            Buy now
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProductDetail;
