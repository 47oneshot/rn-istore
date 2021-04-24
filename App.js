import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from './.expo-shared/app-component/Product';
import HomeScreen from './.expo-shared/app-component/Home';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import eReducer from './.expo-shared/app-component/redux/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import Cart from './.expo-shared/app-component/Cart';

const store = createStore(eReducer,composeWithDevTools());

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"  screenOptions={{
    headerShown:false,
    header: null,
		headerLeft: null,
		headerRight: null,
  }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}
