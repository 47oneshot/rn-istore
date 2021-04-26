import React ,{useState,useEffect,useRef}from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated,
  TouchableHighlight,
  TextInput,
  ActivityIndicator
 


} from 'react-native'
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';

import { useFonts } from 'expo-font';
import RalewayRegular from '../assets/fonts/Montserrat/Raleway-Regular.ttf';
import RalewayBold from '../assets/fonts/Montserrat/Raleway-Bold.ttf';
import RalewayExtraBold from '../assets/fonts/Montserrat/Raleway-ExtraBold.ttf';
import {windowHeightPx, windowWidthPx} from './Product';
import { QUANTITY_ANALYZE, REMOVE_FROM_CART } from './redux/action';
import TabBarNavigate from './Navbar/TabBarNavigate';


const MapSateProps = (state) =>
(
    {
      products : state.shop.products,
      carts :state.shop.cart
      
    }
  )
  

const MapStateDispatch = (dispatch) => (
    {

        removeCart : (id) =>dispatch(REMOVE_FROM_CART(id)),
        qAnalyzed: (quantity,id) =>dispatch(QUANTITY_ANALYZE(quantity,id))

    
    }  
)
 


 function Cart({navigation,carts,removeCart,qAnalyzed}) {


  const [activeTab]=useState('User');


    const [loaded] = useFonts({
        RalewayRegular,
        RalewayBold,
        RalewayExtraBold,
      });
     
   
       ///////////*******************QUANTITY HANDLE***************///////
    {/* const __handleQty=(e,id)=>{

      let qty = e.target.value; 
      console.log(e.target.value);
      
      qty <= 10 ?qAnalyzed(qty,id): alert('Quantity should be in between 1-10');
      
      
     }*/}

     const [showIndicator,setShowIndicator]=useState(false);
     const[forProductId,setForProductId]=useState(0);
     const Increment = (qty,id) => {

      setForProductId(id);
      setShowIndicator(true)

      setTimeout(()=>{
        qty>=1 && qty<10 ?qAnalyzed(qty+1,id):qAnalyzed(qty,id);
        setShowIndicator(false)
      },1000)
      
      
      

    }
    
    const Decrement = (qty,id) => {
     setForProductId(id);
     setShowIndicator(true)
     setTimeout(()=>{
      qty<=1?qAnalyzed(qty,id):qAnalyzed(qty-1,id);
      setShowIndicator(false)
    },1000)
   
    }
     ///////////*************///////

      const __handleSubTotal = ()=>{
        let  total=0;
        carts.forEach(e => {

        total= total + e.productPrice*e.quantity;

        })

       return total;
      }
    
     // console.log(__handleSubTotal());
     
    
const [activeMenu,setActivemenu]=useState('Home')

const [showQuantity,setShowQuantity]=useState(false)

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

const [QuantityItem] = useState([
  1,2,3,4,5,6,7,8,9,10
]);
      const easeAnim = useRef(new Animated.Value(-(windowWidthPx*75))).current;

      const animate = ()=> {
          easeAnim.setValue(-(windowWidthPx*75))
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
      __handleSubTotal();
      
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
        height:windowHeightPx*100,
        marginLeft:easeAnim,
        position:'absolute'
      }
    }>
    <View style={{flex: 1 ,backgroundColor:'#7bad9a',height:windowHeightPx*100,zIndex:999, width:windowWidthPx*75,position:'absolute',top: 0,justifyContent: 'center', alignItems: 'center'}}>
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


   let message;
   if(!productInCarts.length){

   message = <Text style={[styles.headerTitle,{fontFamily:'RalewayRegular'}]}>Your Cart is Empty </Text>;

   }
  
 
    return (
        < View style={{flex:1}}>
        <View style={styles.header}>
        <Icon name='menu' size={30} onPress={__handleMenu} color={'#7bad9a'} />
         
        <Text style={styles.headerTitle}>My Cart</Text>
       
       <TouchableOpacity onPress={()=>navigation.goBack()}><FAIcon name='chevron-circle-left' size={26} color={'#7bad9a'}  /></TouchableOpacity> 
        </View>
        {showMenu==true?Rendermenu: <View></View>} 
        <View style={{flex:1,backgroundColor:'#f8f8f8'}}>
        <ScrollView>
        {message}
         {productInCarts.map(item => (

<View key={item.productId} style={{flexDirection:'row',maxHeight:windowHeightPx*10,justifyContent:'center',alignItems:'center',padding: 5,margin:10,backgroundColor:'#f8f8f8',shadowColor:'grey',shadowRadius:8,shadowOffset:{ width:3,height:3}}}>
<View style={{flex:1,flexBasis:20*windowWidthPx}}>
 <Image
     style={{ flex: 1 ,height:50,width:50}}
     source={{
              uri: item.productImage,
             }}/>
</View>
<View style={{flex:2,flexDirection:'column',flexBasis:50*windowWidthPx,alignItems:'flex-start'}}>
<View style={{flex:1,padding: 5}}>
<Text style={[styles.headerTitle ,{fontFamily:'RalewayRegular',fontSize:12}]} >{item.productName}</Text>
</View>  

<View style={{flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'stretch',width:20*windowWidthPx,marginLeft:windowWidthPx,paddingHorizontal:4,
paddingVertical:1,borderRadius:5,shadowColor:'#6a6a6a',shadowOpacity:0.8,shadowOffset:{
  width:0,
  height:2
},shadowRadius:2
}}>

<TouchableOpacity onPress={()=>Increment(item.quantity,item.productId)} style={{flex:1}}><Image source={require('../assets/icons/icons8-plus-96.png')} style={{ flex: 1 ,maxWidth:20,maxHeight:20}}/></TouchableOpacity>

{/*<TextInput  style={{flex:1,textAlign:'center',width:10}}

keyboardType='numeric'
name='quantity'
value={item.quantity}
onChange ={ (e)=>__handleQty(e,item.productId)}
pattern={[
  /([1-9])\w+/g
]}


/>*/}

{showIndicator==true && forProductId==item.productId?<ActivityIndicator key={item.productId} size="small" color="#6a6a6a" /> :<Text style={{flex:1,textAlign:'center',width:10}}>{item.quantity}</Text>}


<TouchableOpacity style={{flex:1}} onPress={()=>Decrement(item.quantity,item.productId)}><Image source={require('../assets/icons/icons8-minus-96.png')} style={{ flex: 1 ,maxWidth:20,maxHeight:20}}/></TouchableOpacity>

</View>
</View>
<View style={{flex:1,flexBasis:20*windowWidthPx,justifyContent:'center',alignItems:'center'}}>
<FAIcon name='close' size={30} color={'#7bad9a'}  onPress={() => removeCart(item.productId)} />
</View>
</View>

        ))}
 </ScrollView>  
 </View>  
       
 <View style={{width:'100%',backgroundColor:'#fff',justifyContent:'space-around',position:'absolute',bottom:0}}>
 <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
 <Text>Sub Total        </Text> 
 <Text>:</Text> 
 <Text>{parseFloat(__handleSubTotal()).toFixed(2)}</Text>
 </View>
 <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
 <Text>Shipping Cost</Text>
 <Text>:</Text> 
 <Text>{parseFloat(10).toFixed(2)}</Text>
 </View>
 <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',margin:10}}>
 <Text>Estimating Tax</Text>
 <Text>:</Text> 
 <Text>{parseFloat(__handleSubTotal()*0.18).toFixed(2)}</Text>
 </View>
 <View style={{height: 1, backgroundColor: 'black',opacity:0.7}} />
 <View style={{ height: 40 }}></View>
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
export default (connect(MapSateProps,MapStateDispatch))(Cart);