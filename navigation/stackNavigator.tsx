import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/cart";
import Search from "../screens/search";
import Home from "../screens/home";
import ProductDetail from "../screens/productDetail";
import Login from "../screens/login";
import Signup from "../screens/signup";
import { Avatar, Text } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { productSelector } from "../redux/slices/productSlice";
import Profile from "../screens/profile";
import axios from "../services";
import { userSelector } from "../redux/slices/userSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetState } from "../redux/slices/userSlice";
import { useAppDispacth } from "../redux/store";
import { resetCart } from "../redux/slices/cartSlice";
import ResultSearch from "../screens/resultSearch";

export type RootStack = {
  HomeStack: any;
  SearchStack: any;
  CartStack: any;
  ProfileStack: any;
};
export type CartStackParams = {
  cart: undefined;
};

export type HomeStackParam = {
  home: undefined;
  productDetail: {
    product_id: number;
  };
};

export type SearchStackParam = {
  search: undefined;
  productDetail: {
    product_id: number;
  };
  resultSearch:{
    keyword:string
  }
};

export type ProfileStackParam = {
  login: undefined;
  signup: undefined;
  profile: undefined;
};

const CartStack = createNativeStackNavigator<CartStackParams>();

export function CartScreenStack() {
  return (
    <CartStack.Navigator
      screenOptions={{
        headerTitle: "Cart",
        headerLeft: () => <Ionicons name="cart" size={28} color="black" />,
        headerTitleAlign: "center",
      }}
    >
      <CartStack.Screen name="cart" component={Cart} />
    </CartStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator<HomeStackParam>();

export function HomeScreenStack() {
  const { currentProduct } = useSelector(productSelector);
  const {user} = useSelector(userSelector);
  return (
    <HomeStack.Navigator initialRouteName="home">
      <HomeStack.Screen
        name="home"
        component={Home as any}
        options={{
          headerLeft: () => 
            user.image ? (
              <Avatar.Image
                size={37}
                source={{ uri: axios.getUri() + user?.image }}
              />
            ) : (
              <Avatar.Icon
                size={37}
                icon="account"
                style={{ backgroundColor: "#bbb" }}
              />
            ),
          headerRight: () => <IconButton icon="bell-outline" size={24} />,
          headerTitleAlign: "center",
          headerTitle: () => (
            <Image
              source={require("../assets/logo/logo-App.png")}
              style={{ marginTop: 5,width:110,height:50 }}
            />
          ),
        }}
      />
      <HomeStack.Screen
        name="productDetail"
        component={ProductDetail as any}
        options={{
          headerTitle: () => (
            <Text variant="labelLarge" style={{ fontSize: 17 }}>
              {currentProduct.c_name}
            </Text>
          ),
          animation: "fade_from_bottom",
          contentStyle: { backgroundColor: "#ffffff" },
          headerRight: () => <Ionicons name="cart" size={24} color="black" />,
          headerTitleAlign: "center",
          
        }}
      />
    </HomeStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator<SearchStackParam>();

export function SearchScreenStack() {

  const { currentProduct } = useSelector(productSelector);
  
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTitle: "Search",
      }}
    >
      <SearchStack.Screen name="search" component={Search as any}/>
      <SearchStack.Screen name="resultSearch" component={ResultSearch as any} options={{
        contentStyle:{backgroundColor:"#ffffff"}
      }}/>
      <SearchStack.Screen name="productDetail" component={ProductDetail as any} options={{
        headerTitle:currentProduct.c_name,
        headerTitleAlign:"center",
        contentStyle:{backgroundColor:"#fff"}
      }}/>
    </SearchStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator<ProfileStackParam>();
type Props = NativeStackScreenProps<RootStack, "ProfileStack">;

export function LoginScreenStack({ navigation }: Props) {
  const dispatch = useAppDispacth();
  return (
    <ProfileStack.Navigator initialRouteName="login">
      <ProfileStack.Screen
        name="login"
        component={Login as any}
        options={{
          headerShown: false,
        }}
      />
      <ProfileStack.Screen
        name="signup"
        component={Signup as any}
        options={{
          title: "",
        }}
      />
      <ProfileStack.Screen
        name="profile"
        component={Profile as any}
        options={{
          headerLeft:()=>"",
          title: "Profile",
          headerTitleAlign: "center",
          headerRight: () => (
            <IconButton
              icon="logout"
              size={24}
              iconColor="red"
              onPress={async () => {
                await AsyncStorage.removeItem("accessToken");
                await AsyncStorage.removeItem("refreshToken");
                await dispatch(resetState());
                await dispatch(resetCart());
                navigation.navigate("ProfileStack", { screen: "login" });
              }}
            />
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
}
