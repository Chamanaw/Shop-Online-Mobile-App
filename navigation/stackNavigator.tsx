import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from '../screens/cart';
import Category from "../screens/category";
import Home from '../screens/home';
import ProductDetail from '../screens/productDetail';
import Login from "../screens/login";
import Signup from "../screens/signup";
import { Avatar, Text } from 'react-native-paper';
import { IconButton } from 'react-native-paper';
import { Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export type RootStack = {
    HomeStack:any;
    CategoryStack:any;
    CartStack:any;
    LoginStack:any;
}
export type CartStackParams = {
    cart:undefined
}

export type HomeStackParam = {
    home:undefined,
    productDetail:{
        product_id:number
    }
}

export type CategoryStackParam = {
    category:undefined
    productDetail:{
        product_id:number
    }
}

export type LoginStackParam = {
    login:undefined
    signup:undefined
}

const CartStack = createNativeStackNavigator<CartStackParams>()

export function CartScreenStack() {
    
    return (
        <CartStack.Navigator
            screenOptions={{
                headerTitle: "Cart",
                headerLeft: () => <Ionicons name="cart" size={28} color="black" />,
                headerTitleAlign: "center",
            }}
        >
            <CartStack.Screen name='cart' component={Cart} />
        </CartStack.Navigator>
    )
}

const HomeStack = createNativeStackNavigator<HomeStackParam>()

export function HomeScreenStack() {
    return (
        <HomeStack.Navigator initialRouteName="home">
            <HomeStack.Screen name='home' component={Home as any}
                options={{
                    headerLeft: () => <Avatar.Text size={37} label="XD" />,
                    headerRight: () => <IconButton
                        icon="bell-outline"
                        size={24}
                        onPress={() => console.log('Pressed')}
                    />,
                    headerTitleAlign: "center",
                    headerTitle: () => <Image source={{ uri: "https://img.freepik.com/free-vector/detailed-click-collect-sign_23-2148779338.jpg?t=st=1713121176~exp=1713124776~hmac=2e3137ed87253b1b1c9985b1af639ac6cc96f72425e81bb4db9e98c93ba475d2&w=1380" }}
                        width={110}
                        height={50}
                        style={{ marginTop: 5 }}
                    />,
                }}
            />
            <HomeStack.Screen name='productDetail' component={ProductDetail} options={{
                headerTitle: () => <Text variant='labelLarge' style={{ fontSize: 17 }}>{'Smart Phone'}</Text>,
                animation: "fade_from_bottom",
                contentStyle: { backgroundColor: "#ffffff" },
                headerRight: () => <Ionicons name="cart" size={24} color="black" />,
                headerTitleAlign: "center"
            }} />
        </HomeStack.Navigator>
    )
}

const CategoryStack = createNativeStackNavigator<CategoryStackParam>()

export function CategoryScreenStack() {

    return (
        <CategoryStack.Navigator
            screenOptions={{
                headerTitle: "Categories",
                headerRight: () => <IconButton
                    icon="bell-outline"
                    size={24}
                    onPress={() => console.log('Pressed')}
                />,
            }}>
            <CategoryStack.Screen name='category' component={Category} />
        </CategoryStack.Navigator>
    )
}

const LoginStack = createNativeStackNavigator<LoginStackParam>()

export function LoginScreenStack() {
    return (
        <LoginStack.Navigator
            initialRouteName="login"
        >
            <LoginStack.Screen name='login' component={Login as any} options={{
                headerShown: false
            }} />
            <LoginStack.Screen name='signup' component={Signup} options={{
                title: ""
            }} />
        </LoginStack.Navigator>
    )
}

