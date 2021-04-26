import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from './app-component/Product';
import HomeScreen from './app-component/Home';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import eReducer from './app-component/redux/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import Cart from './app-component/Cart';
import Shop from './app-component/Shop';
import Wishlist from './app-component/Wishlist';



const store = createStore(eReducer,composeWithDevTools());

const Stack = createStackNavigator();


export default class App extends Component {
  render() {
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
          <Stack.Screen name="Shop" component={Shop} />
          <Stack.Screen name="Wishlist" component={Wishlist} />
          <Stack.Screen name="Cart" component={Cart} />
        
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    )
  }
}
