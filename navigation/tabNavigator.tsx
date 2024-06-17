import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { HomeScreenStack,CartScreenStack,CategoryScreenStack,LoginScreenStack } from './stackNavigator';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RootStack } from './stackNavigator';

function TabNavigator (){
    const Tab = createBottomTabNavigator<RootStack>();
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
            />
            <Tab.Screen
              name='CategoryStack'
              component={CategoryScreenStack}
              options={{
                tabBarLabel: "Category",
                tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
                headerShown: false

              }}
            />
            <Tab.Screen
              name='CartStack'
              component={CartScreenStack}
              options={{
                tabBarLabel: "Cart",
                tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
                headerShown: false

              }}
            />
            <Tab.Screen
              name="LoginStack"
              component={LoginScreenStack}
              options={{
                tabBarLabel: "User",
                tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
                headerTitle: "Log in",
                headerShown: false
              }}
            />
          </Tab.Navigator>
    )
}

export default TabNavigator