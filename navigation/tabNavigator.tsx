import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { HomeScreenStack,CartScreenStack,CategoryScreenStack,LoginScreenStack } from './stackNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootStack } from './stackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { userSelector } from '../redux/slices/userSlice';
import { cartSelector } from '../redux/slices/cartSlice';


type Home = NativeStackScreenProps<RootStack,'HomeStack'>
type category = NativeStackScreenProps<RootStack,"CategoryStack">
type cart = NativeStackScreenProps<RootStack,"CartStack">
type profile = NativeStackScreenProps<RootStack,"ProfileStack">


function TabNavigator (){

    const {cart} = useSelector(cartSelector)
    const Tab = createBottomTabNavigator<RootStack>();
    const user = useSelector(userSelector)

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
                tabPress: e => {
                  e.preventDefault();
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'HomeStack' }],
                    })
                  );
                },
              })}
            />
            <Tab.Screen
              name='CategoryStack'
              component={CategoryScreenStack}
              options={{
                tabBarLabel: "Category",
                tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
                headerShown: false
              }}
              listeners={({navigation}:category)=>({
                tabPress:e=>{
                  e.preventDefault()
                  navigation.navigate('CategoryStack',{screen:"category"})
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
                headerTitle: "Log in",
                headerShown: false
              }}
              listeners={({navigation}:profile)=>({
                  tabPress:e=>{
                    e.preventDefault()
                    navigation.navigate('ProfileStack',{screen:(user.user)?'profile':'login'})
                  }
              })}
            />
          </Tab.Navigator>
    )
}

export default TabNavigator