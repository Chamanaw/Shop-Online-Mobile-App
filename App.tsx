import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TabNavigator from './navigation/tabNavigator'

export default function App() {

  return (
    <Provider store={store}>
      <View style={styles.container}>
          <NavigationContainer  >
              <TabNavigator />
          </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
