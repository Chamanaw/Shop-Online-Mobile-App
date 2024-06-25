import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { HomeScreenStack,CartScreenStack,SearchScreenStack,LoginScreenStack } from './stackNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootStack } from './stackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/slices/userSlice';
import { cartSelector } from '../redux/slices/cartSlice';


type Home = NativeStackScreenProps<RootStack,'HomeStack'>
type Search = NativeStackScreenProps<RootStack,"SearchStack">
type cart = NativeStackScreenProps<RootStack,"CartStack">
type profile = NativeStackScreenProps<RootStack,"ProfileStack">


function TabNavigator (){

    const {cart} = useSelector(cartSelector)
    const Tab = createBottomTabNavigator<RootStack>();
    const {user} = useSelector(userSelector)

    return(
        <Tab.Navigator screenOptions={{
            tabBarLabelPosition: 'below-icon',
            tabBarActiveTintColor: "#ff4c3b",
            headerTintColor: "white",
          }}>
            <Tab.Screen
              name='HomeStack'
              component={HomeScreenStack}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => <Ionicons name="home" size={22} color={color} />,
                headerShown: false
                
              }}
              listeners={({ navigation }:Home) => ({
                tabPress:e=>{
                  e.preventDefault()
                  navigation.navigate('HomeStack',{screen:"home"})
                }
              })}
            />
            <Tab.Screen
              name='SearchStack'
              component={SearchScreenStack}
              options={{
                tabBarLabel: "Search",
                tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
                headerShown: false,
                
              }}
              listeners={({navigation}:Search)=>({
                tabPress:e=>{
                  e.preventDefault()
                  navigation.navigate('SearchStack',{screen:"search"})
                }
              })}
            />
            <Tab.Screen
              name='CartStack'
              component={CartScreenStack}
              options={{
                tabBarLabel: "Cart",
                tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
                headerShown: false,
                tabBarBadge: cart.length
              }}
              listeners={({navigation}:cart)=>({
                tabPress:e=>{
                  e.preventDefault()
                  navigation.navigate('CartStack',{screen:"cart"})
                }
              })}
            />
            <Tab.Screen
              name="ProfileStack"
              component={LoginScreenStack}
              options={{
                tabBarLabel: "User",
                tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
                headerShown: false
              }}
              listeners={({navigation}:profile)=>({
                  tabPress:e=>{
                    e.preventDefault()
                    navigation.navigate('ProfileStack',{screen:user.user_name?"profile":"login"})
                  }
              })}
            />
          </Tab.Navigator>
    )
}

export default TabNavigator