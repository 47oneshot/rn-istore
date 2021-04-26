import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
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
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';
import TabBarNavigate from './app-component/Navbar/TabBarNavigate';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const store = createStore(eReducer,composeWithDevTools());

const Stack = createStackNavigator();
const BottomTab =createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();





export default class App extends Component {


  

  HomeStack= () => {
    return (
      <Stack.Navigator initialRouteName="Home"  screenOptions={{
        headerShown:false,
        header: null,
        headerLeft: null,
        headerRight: null,
      }}>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen name="Shop" component={Shop} />
            <Stack.Screen name="Wishlist" component={Wishlist} />
            <Stack.Screen name="Cart" component={Cart} />
          
      </Stack.Navigator>
    )
  }
  

  BottomTabNavigate = () =>{
    return(
      <BottomTab.Navigator
      initialRouteName="Home"
      /*activeColor="#e91e63"
      labelStyle={{ fontSize: 12 }}
    style={{ backgroundColor: 'tomato' }}*/

      tabBar={(props) => <TabBarNavigate {...props} />}
    >
      <BottomTab.Screen
        name="Home"
        component={this.HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
       <BottomTab.Screen
        name="Cart"
        component={this.CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" color={color} size={26} />
          ),
        }}
      />
      
    </BottomTab.Navigator>
    )   
  }


  render() {
    return (
      <SafeAreaProvider>
      <Provider store={store}>
      <NavigationContainer>
       
     {/* <BottomTab.Navigator tabBar={(props) => <TabBarNavigate {...props} />}>
      
      <this.StackScreen/>

      </BottomTab.Navigator>*/}
     
  <Tab.Navigator tabBar={(props) => <TabBarNavigate {...props} />}>
 
  <Tab.Screen 
   name="Screen_1" 
   component={this.HomeStack} />


</Tab.Navigator>
      </NavigationContainer>
      </Provider>
      </SafeAreaProvider>
    )
  }
}
