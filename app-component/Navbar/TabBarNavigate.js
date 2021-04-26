import React,{useState,useEffect} from 'react'
import { View,TouchableOpacity,StyleSheet} from 'react-native'
import {windowWidthPx,windowHeightPx} from '../Product';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';

import { useFonts } from 'expo-font';

import RalewayRegular from '../../assets/fonts/Montserrat/Raleway-Regular.ttf';
import RalewayBold from '../../assets/fonts/Montserrat/Raleway-Bold.ttf';
import RalewayExtraBold from '../../assets/fonts/Montserrat/Raleway-ExtraBold.ttf';
export default function TabBarNavigate(props) {



  const [loaded] = useFonts({
    RalewayRegular,
    RalewayBold,
    RalewayExtraBold,
  });
  const rootBackground ='#f1c40f';
  const rootGrey='#f8f8f8';
  const rootBlack='#6a6a6a';
  const rootPureBlack='#000';
  const rootWhite='#fff';
  const rootButton ='#ba8d23';

  const [activeTab,setActiveTab]=useState(props.activeTab);
  

  console.log(activeTab);
    const [tabBar] = useState([
        { id:1, label: 'Home' ,icon:'home',Screen:'Home'},
        { id:2, label: 'User',icon:'user' ,Screen:'Cart'},
        { id:3,  label: 'Wishlist' ,icon:'heart',Screen:'Wishlist'},
        { id:4,  label: 'Shop' ,icon:'shopping-cart',Screen:'Shop'},
      ]);

    return (
      
      <View style={{flexDirection:'column'}}>
      <View style={{flexGrow:1,height:windowWidthPx,backgroundColor:rootButton}}></View> 
      
      <View style={{flexDirection:'row'}}>

      {tabBar.map(item =>
       
        <TouchableOpacity activeOpacity={0.9}  key={item.id}  onPress={()=>{
        //  setActiveTab(item.label);
          props.onPress(item.Screen);
          setActiveTab(props.activeTab)

        }}  style={activeTab==item.label?styles.tabBarActive:styles.tabBar}><Icon name={item.icon} size={30} color={rootGrey} /></TouchableOpacity>
      )}  
      
      </View> 
      
      </View>
    )
}
const styles = StyleSheet.create({
  tabBar:{
    backgroundColor:'#f1c40f',
    flexGrow:1,
    alignSelf:'center',
    height: 60,
    justifyContent:'center',
    alignItems:'center'
    

  },
  tabBarActive:{
    backgroundColor:'#ba8d23',
    flexGrow:1,
    alignSelf:'center',
    height: 60,
    justifyContent:'center',
    alignItems:'center'
    

  },
})