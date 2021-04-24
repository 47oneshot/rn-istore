import React ,{useState,useEffect,useRef}from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated


} from 'react-native'
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import RalewayRegular from '../../assets/fonts/Montserrat/Raleway-Regular.ttf';
import RalewayBold from '../../assets/fonts/Montserrat/Raleway-Bold.ttf';
import RalewayExtraBold from '../../assets/fonts/Montserrat/Raleway-ExtraBold.ttf';
import {windowHeightPx, windowWidthPx} from './Product';

const MapSateProps = (state) =>
(
    {
      products : state.shop.products,
      carts :state.shop.cart
      
    }
  )
 
 function Cart({navigation,carts}) {
 
    const [loaded] = useFonts({
        RalewayRegular,
        RalewayBold,
        RalewayExtraBold,
      });
    
const [activeMenu,setActivemenu]=useState('Home')

const [MenuItem] = useState([
  { id:1, label: 'Home' ,icon:'home'},
  { id:2, label: 'Shop by Category',icon:'list-alt' },
  { id:3,  label: `Today's Deal` ,icon:'truck'},
  { id:4,  label: 'Your Orders' ,icon:'shopping-cart'},
  { id:5,  label: 'Your Wish List' ,icon:'heart'},
  { id:6,  label: 'Your Account',icon:'user' },
  { id:7,  label: 'Settings' ,icon:'cog'},
  { id:8,  label: 'Customer Service',icon:'headphones' },
  { id:9,  label: 'Logout',icon:'arrow-circle-right' },
]);
      const easeAnim = useRef(new Animated.Value(-350)).current;

      const animate = ()=> {
          easeAnim.setValue(-350)
          Animated.timing(
            easeAnim,
            {
              toValue: 0,
              duration: 800,
              useNativeDriver:false
            }
        ).start()
      }
    const [productInCarts,setProductInCarts] = useState(carts);
  
    useEffect(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#fff');
      setProductInCarts(carts);
  
    }, [carts]);
  
    const [showMenu, isShowMenu] = useState(false);


    const  __handleMenu = () =>{
       isShowMenu(true);
       animate();
    }

    
let Rendermenu = (
    <Animated.View  style={
      {
        flex:1,
        height:800,
        marginLeft:easeAnim,
        position:'absolute'
      }
    }>
    <View style={{flex: 1 ,backgroundColor:'#7bad9a',height:800,zIndex:999, width:350,position:'absolute',top: 0,justifyContent: 'center', alignItems: 'center'}}>
    <View style={[styles.header,{justifyContent:'space-between',alignItems:'center',width:250}]}>
    <Text style={[styles.headerTitle,{textAlign:'center'}]}>Menu</Text>
    <FAIcon name='close' size={30} color={'#7bad9a'}  onPress={() => isShowMenu(false)} />
       
      
    </View>
   
    <View style={{flex:1,justifyContent:'space-evenly',alignItems:'flex-start',marginTop:10}}>
    {MenuItem.map((s)=>
    <TouchableOpacity key={s.id}
    
    onPress={() => setActivemenu(s.label)}
    style={{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'flex-start',
      backgroundColor:activeMenu===s.label? '#fff':'#7bad9a',
      borderBottomEndRadius:activeMenu===s.label? 30:0,
      borderTopEndRadius:activeMenu===s.label? 30:0,
      paddingVertical:5,
    }}
    >
      
      <FAIcon name={s.icon} size={23} color={activeMenu===s.label? '#b2b3b3':'#fff'} style={{marginLeft:10}}/>
      <Text style={ 
       activeMenu === s.label
      ? styles.Menuactive
      : styles.MenuItem}>{s.label}</Text></TouchableOpacity>
    )}
    
    </View>
  </View>
  </Animated.View>
  )

    return (
        < View style={{flex:1}}>
        <View style={styles.header}>
        <Icon name='menu' size={30} onPress={__handleMenu} color={'#7bad9a'} />
         
        <Text style={styles.headerTitle}>Home</Text>
        <Icon name='shopping-bag' size={26} onPress={()=>navigation.navigate('Cart')} color={'#7bad9a'}  />
        </View>
        {showMenu==true?Rendermenu: <View></View>} 
        <View style={{flex:1}}>
         {productInCarts.map(item => (

<View key={item.productId} style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginHorizontal:10,marginVertical:10}}>
<View style={{flex:1,flexBasis:20*windowWidthPx}}>
 <Image
     style={{ flex: 1 ,height:50,width:50}}
     source={{
              uri: item.productImage,
             }}/>
</View>
<View style={{flex:2,flexDirection:'column',flexBasis:50*windowWidthPx,justifyContent:'flex-start',alignItems:'flex-start'}}>
<Text>{item.productName}</Text>
<Text>{item.quantity}</Text>
</View>
<View style={{flex:1,flexBasis:20*windowWidthPx,justifyContent:'center',alignItems:'center'}}>
<FAIcon name='close' size={30} color={'#7bad9a'}  onPress={() => isShowMenu(false)} />
</View>
</View>

        ))}
         </View>  
       
        
        
        </ View>
    )
}


const styles = StyleSheet.create({
    header: {
      height: 50,
      backgroundColor: '#fff',
      marginTop: Constants.statusBarHeight,
      paddingHorizontal: 10,
      borderBottomColor: '#dfe4fe',
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: 'RalewayBold',
    },
    MenuItem:{
        // paddingHorizontal: 10,
         color: '#fff',
         textAlign:'left',
         fontSize:14,
         fontFamily:'RalewayRegular',
         marginLeft:20,
         width:200,
         marginTop:3
       },
       Menuactive:{
         color: '#b2b3b3',
         textAlign:'left',
         fontSize:14,
         fontFamily:'RalewayRegular',
         width:200,
         marginLeft:20,
         marginTop:3
     
       }

})
export default (connect(MapSateProps))(Cart);