import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated,
  Alert
} from 'react-native';

import Constants from 'expo-constants';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';

import { useFonts } from 'expo-font';

import RalewayRegular from '../assets/fonts/Montserrat/Raleway-Regular.ttf';
import RalewayBold from '../assets/fonts/Montserrat/Raleway-Bold.ttf';
import RalewayExtraBold from '../assets/fonts/Montserrat/Raleway-ExtraBold.ttf';
import {windowHeightPx, windowWidthPx} from './Product';

import {connect} from 'react-redux'
import { ADD_TO_CART } from './redux/action';
import TabBarNavigate from './Navbar/TabBarNavigate';


const MapSateProps = (state) =>(
  {
    products : state.shop.products,
    carts :state.shop.cart
    
  }
)


const mapDispatch= (dispatch) =>(
  {
    addToCart : (id) => dispatch(ADD_TO_CART(id)),
  }
)




const Rating = ({ rating, maxRating }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array(rating)
        .fill(1)
        .map((el,index) => (
          <FAIcon key={index} name='star' size={20} color='#2e2e2e' />
        ))}
      {Array(maxRating - rating)
        .fill(1)
        .map((el,index) => (
          <FAIcon key={index} name='star-o' size={20} color='#2e2e2e' />
        ))}
    </View>
  );
};

function HomeScreen({navigation,products,addToCart,carts}) {
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

  const [isFavourite, setFavourite] = useState(false);
  const [size] = useState([
    { id: 1, label: 'S' },
    { id: 2, label: 'M' },
    { id: 3, label: 'L' },
    { id: 4, label: 'XL' },
  ]);

  const [selectedSize, setSelectedSize] = useState('M');

  const [productDescription] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ornare urna. Duis egestas ligula quam, ut tincidunt ipsum blandit at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae justo congue, tempor urna vitae, placerat elit. Nulla nec consectetur dolor, in convallis erat. Fusce hendrerit id sem tristique congue. \n\nVestibulum mauris sapien, vulputate in lacus in, lacinia efficitur magna. Sed id massa ut magna eleifend lacinia et id tellus. Sed dignissim mollis lacus. Etiam laoreet ex eu sem euismod congue. In maximus porttitor imperdiet. Nulla eu dolor vehicula ligula mollis tristique ut in enim. Phasellus quis tempor velit. Vivamus sit amet orci ornare, pulvinar purus et, commodo magna. Nunc eu tortor vitae leo varius vehicula quis volutpat dolor.\n\nDonec interdum rutrum tellus, et rhoncus risus dignissim at. Aliquam sed imperdiet tortor, non aliquam sapien. Cras quis enim a elit fringilla vehicula. Aenean pulvinar ipsum a magna feugiat, a fermentum ante pellentesque. Mauris tincidunt placerat placerat. Quisque tincidunt enim sed metus fermentum maximus. Fusce eu tempus est.`
  );

  const [seeFullDescription, setSeeFullDescription] = useState(false);

  const [moreProducts] = useState(products);
  const [productInCarts,setProductInCarts] = useState(carts);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
    setProductInCarts(carts);



  }, [carts]);

  const [showMenu, setShowMenu] = useState(false);


const  __handleMenu = () =>{
   setShowMenu(true);
   animateEaceIn();

}

const  __handleCloseMenu = () =>{
  animateEaceOut();
 setTimeout(()=>{
  setShowMenu(false);
 },800)
  
  
}

const [activeMenu,setActivemenu]=useState('Home')

const [activeTab]=useState('Home');

const [MenuItem] = useState([
  { id:1, label: 'Home' ,icon:'home',Screen:'Cart'},
  { id:2, label: 'Shop by Category',icon:'list-alt' ,Screen:'Home'},
  { id:3,  label: `Today's Deal` ,icon:'truck',Screen:'Home'},
  { id:4,  label: 'Your Orders' ,icon:'shopping-cart',Screen:'Home'},
  { id:5,  label: 'Your Wish List' ,icon:'heart',Screen:'Home'},
  { id:6,  label: 'Your Account',icon:'user',Screen:'Home' },
  { id:7,  label: 'Settings' ,icon:'cog',Screen:'Home'},
  { id:8,  label: 'Customer Service',icon:'headphones' ,Screen:'Home'},
  { id:9,  label: 'Logout',icon:'arrow-circle-right',Screen:'Home' },
]);




const easeAnim = useRef(new Animated.Value(-windowWidthPx*100)).current;

const animateEaceIn = ()=> {
    //console.log(easeAnim);
    easeAnim.setValue(-windowWidthPx*100)
    Animated.timing(
      easeAnim,
      {
        toValue: 0,
        duration: 800,
        useNativeDriver:false
      }
  ).start()
}
const animateEaceOut = ()=> {
 // console.log(easeAnim);
  easeAnim.setValue(0)
  Animated.timing(
    easeAnim,
    {
      toValue: -windowWidthPx*100,
      duration: 800,
      useNativeDriver:false
    }
).start()
}



  if (!loaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

/*
  if (showMenu) {
    return (
      
      <View style={{flex:1,backgroundColor:rootButton}}>
      <View style={styles.header}>
      <FAIcon name='close' size={30} color={rootButton}  onPress={() => isShowMenu(false)} />
         
        <Text style={styles.headerTitle}>IStore</Text>
        <Icon name='shopping-bag' size={26} color={rootButton} />
      </View>
      <Animated.View  style={
        {
          flex:1,
          height:'100%',
          marginLeft:easeAnim,
        }
      }>
      <View style={{flex:1,height:'100%', width:200,justifyContent:'space-evenly',alignItems:'flex-start',marginTop:60,backgroundColor:rootButton}}>
      {MenuItem.map((s)=>
      <TouchableOpacity key={s.id}
      
      onPress={() => setActivemenu(s.label)}
      style={{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'flex-start',
        backgroundColor:activeMenu===s.label? '#fff':rootButton,
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
      </Animated.View>
    </View>
   
    );
  }
*/
/*
const  RenderCart = () =>  {
return
(
  <View style={{flex:1,justifyContent:'flex-end',flexDirection:'column',backgroundColor:'#fff',zIndex:999,height:800, width:350,position:'absolute',top: 0,right:0}}>
   {productInCarts.map((item,index) => 
     <View key={index} style={{flex: 1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
       <View style={{flex:1,height:50,width:50}}>
        <Image
            style={{ flex: 1 }}
            source={{
                     uri: item.productImage,
                    }}/>
       </View>
       <View style={{flex:2,flexDirection:'column'}}>
       <Text>{item.productName}</Text>
       <Text>{item.quantity}</Text>
       </View>
       <View style={{flex:1}}>
       <FAIcon name='close' size={30} color={rootButton}  onPress={() => isShowMenu(false)} />
       </View>
     </View>
)}
  </View>
)}*/

const __handleAddtoCart = (id) => {
    addToCart(id);
    Alert.alert('Added Sucessfully in Cart');
}




let Rendermenu = (
  <Animated.View  style={
    {
      flex:1,
      height:windowHeightPx*100,
      marginLeft:easeAnim,
      position:'absolute',
      flexDirection:'row',
      width:windowWidthPx*100,
      zIndex:9999,
     
    }
  }>
 <TouchableOpacity onPress={() => __handleCloseMenu()} activeOpacity={1}  style={{flex:1,zIndex:-1,backgroundColor:'#00000057',height:windowHeightPx*100,width:windowWidthPx*100,alignItems:'flex-start',justifyContent:'center'}}>
 
  <TouchableOpacity activeOpacity={1}   style={{flex: 1,backgroundColor:rootButton,maxHeight:windowHeightPx*75,marginTop:Constants.statusBarHeight ,flexBasis:windowWidthPx*65,justifyContent: 'center', alignItems: 'center'}}>
  <View style={[styles.header,{justifyContent:'space-between',alignItems:'center',marginTop:0,width:windowWidthPx*65}]}>
  <Text style={[styles.headerTitle,{textAlign:'center'}]}>Menu</Text>
  <FAIcon name='close' size={30} color={rootButton}  onPress={() => {animateEaceOut();}} />
     
    
  </View>
 
  <View style={{flex:1,justifyContent:'space-evenly',alignItems:'flex-start',marginTop:10}}>
  {MenuItem.map((s)=>
  <TouchableOpacity key={s.id}
  
  onPress={() =>{ setActivemenu(s.label);
  navigation.navigate(s.Screen);
  }}
  style={{
   // flex:1,
    flexDirection:'row',
    height:25,
    //justifyContent:'space-around',
    alignItems:'center',
    width:windowWidthPx*55,
    backgroundColor:activeMenu===s.label? '#fff':rootButton,
    borderBottomEndRadius:activeMenu===s.label? 30:0,
    borderTopEndRadius:activeMenu===s.label? 30:0,
    paddingVertical:windowHeightPx*2,
   
  }}
  >
    
    <FAIcon name={s.icon} size={23} color={activeMenu===s.label? '#b2b3b3':'#fff'} style={{paddingHorizontal:10}}/>
    <Text style={[
     activeMenu === s.label
    ? styles.Menuactive
    : styles.MenuItem,{marginLeft:0}]}>{s.label}</Text></TouchableOpacity>
  )}
  
  </View>
  
</TouchableOpacity>
{/*<TouchableOpacity onPress={() => __handleCloseMenu()} activeOpacity={0.3} style={{flex:1,backgroundColor:rootBlack,opacity:0.4}}></TouchableOpacity>*/}
</TouchableOpacity>
</Animated.View>
)
  return (
    <View style={{ flex: 1 ,
    //flexDirection:'column',
   // overflow:'hidden'
    backgroundColor: '#f8f8f8',
   /// zIndex:9999,
    }}>
      
      {showMenu==true?Rendermenu:<View></View>}

     <View  style={{flex: 1,zIndex:1}} >
      <View style={styles.header}>
        <Icon name='menu' size={30} onPress={__handleMenu} color={rootButton} />
         
        <Text style={styles.headerTitle}>Home</Text>
        <Icon name='shopping-bag' size={26} onPress={()=>navigation.navigate('Cart')} color={rootButton}  />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1,zIndex:1}}>
       
      
      <View style={{justifyContent:'center',alignItems:'center'}}>
         <Image source={require(`../assets/coverImage/cover1.jpg`)} style={{height:60*windowHeightPx,width:100*windowWidthPx}}/>
       </View>

        
        <View style={{ marginTop: 0,backgroundColor:rootBackground }}>
          <Text
            style={{
              fontFamily: 'RalewayBold',
              fontSize: 20,
              marginHorizontal: 10,
             //backgroundColor:rootBackground,
              paddingVertical:10
            }}
          >
            More Products
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: 'row',paddingBottom:10}}>
              {moreProducts.map((item) => (
                <View key={item.productId} style={{ width: windowWidthPx*45,height:windowHeightPx*50, marginHorizontal: 10,padding:10,backgroundColor:rootGrey }}>
                  <View style={styles.moreProductImageView}>
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item.productImage,
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.moreProductName}>
                      {item.productName}
                    </Text>
                    <View style={styles.moreProductPriceView}>
                      <Text style={styles.moreProductPrice}>
                        ${item.productPrice}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon
                          style={styles.moreProductIcon}
                          name='heart'
                          size={18}
                        />
                        <TouchableOpacity>
                        <Icon
                          style={styles.moreProductIcon}
                          name='shopping-bag'
                          color={rootButton}
                          size={18}
                          onPress={()=>__handleAddtoCart(item.productId)}
                        />
                        </TouchableOpacity>
                        <Icon
                          style={styles.moreProductIcon}
                          name='share'
                          size={18}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.moreProductBuyButton,{backgroundColor:rootButton}]}>
                    <Text style={styles.moreProductBuyButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
          
        </View>
        <View style={{ height: 10 }}></View>
       

        <View style={{ backgroundColor:rootBackground }}>
          <Text
            style={{
              fontFamily: 'RalewayBold',
              fontSize: 20,
              marginHorizontal: 10,
              paddingVertical:10
            }}
          >
            Most Trending Products
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: 'row',paddingBottom:10}}>
              {moreProducts.map((item) => (
                <View key={item.productId} style={{ width: windowWidthPx*45,height:windowHeightPx*50, marginHorizontal: 10 ,backgroundColor:rootGrey,padding:10}}>
                  <View style={styles.moreProductImageView}>
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item.productImage,
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.moreProductName}>
                      {item.productName}
                    </Text>
                    <View style={styles.moreProductPriceView}>
                      <Text style={styles.moreProductPrice}>
                        ${item.productPrice}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon
                          style={styles.moreProductIcon}
                          name='heart'
                          color={'red'}
                          size={18}
                        />
                        <TouchableOpacity>
                        <Icon
                          style={styles.moreProductIcon}
                          name='shopping-bag'
                          color={rootButton}
                          size={18}
                          onPress={() => addToCart(item.productId)}
                        />
                        </TouchableOpacity>
                        
                        <Icon
                          style={styles.moreProductIcon}
                          name='share'
                          color={'blue'}
                          size={18}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.moreProductBuyButton,{backgroundColor:rootButton}]}>
                    <Text style={styles.moreProductBuyButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
          
        </View>
        <View style={{ height: 10 }}></View>
        <View style={{ backgroundColor:rootBackground}}>
          <Text
            style={{
              fontFamily: 'RalewayBold',
              fontSize: 20,
              marginHorizontal: 10,
              paddingVertical:10
            }}
          >
            Top Selling Products
          </Text>
          <ScrollView  showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: 'row',flexWrap:'wrap'}}>
              {moreProducts.map((item) => (
                <View key={item.productId} style={{
                   marginHorizontal: 10,height:windowHeightPx*50,
                   flexBasis:windowWidthPx*50-20,marginBottom:10,
                   padding:10,backgroundColor:rootGrey
                   
                   }}>
                  <View style={styles.moreProductImageView}>
                    <Image
                      style={{ flex: 1 }}
                      source={{
                        uri: item.productImage,
                      }}
                    />
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Text style={styles.moreProductName}>
                      {item.productName}
                    </Text>
                    <View style={styles.moreProductPriceView}>
                      <Text style={styles.moreProductPrice}>
                        ${item.productPrice}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon
                          style={styles.moreProductIcon}
                          name='heart'
                          size={18}
                        />
                        <TouchableOpacity>
                        <Icon
                          style={styles.moreProductIcon}
                          name='shopping-bag'
                          color={rootButton}
                          size={18}
                          onPress={() => addToCart(item.productId)}
                        />
                        </TouchableOpacity>
                        <Icon
                          style={styles.moreProductIcon}
                          name='share'
                          size={18}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.moreProductBuyButton,{backgroundColor:rootButton}]} onPress={()=>navigation.navigate('Product',{
                      productId :item.productId
                      
                      })}>
                    <Text style={styles.moreProductBuyButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
          
        </View>
      
      </ScrollView>
      
     {/* <TabBarNavigate activeTab={activeTab} onPress={navigation.navigate}/>*/}
    </View>
    
    </View>
  );
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
  detailsView: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  productTitleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 24,
    fontFamily: 'RalewayExtraBold',
  },
  productPriceView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPriceText: { fontFamily: 'RalewayBold', fontSize: 20 },
  actualPriceText: {
    color: '#222',
    marginLeft: 10,
    textDecorationLine: 'line-through',
    fontSize: 18,
    fontFamily: 'RalewayRegular',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#ba8d23',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#ba8d23',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'RalewayBold',
  },
  tag: {
    borderRadius: 4,
    backgroundColor: '#FFF',
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabel: {
    fontFamily: 'RalewayBold',
    color: '#333',
  },
  tagSelected: {
    backgroundColor: '#333',
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagLabelSelected: {
    fontFamily: 'RalewayBold',
    color: '#FFF',
  },
  productDescriptionHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4fe',
  },
  moreProductImageView: {
    flex: 1,
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  moreProductName: {
    fontFamily: 'RalewayBold',
    fontSize: 16,
  },
  moreProductPriceView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  moreProductPrice: {
    fontSize: 16,
    fontFamily: 'RalewayRegular',
  },
  moreProductIcon: {
    marginLeft: 10,
  },
  moreProductBuyButton: {
    backgroundColor: '#ba8d23',
    marginTop: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreProductBuyButtonText: {
    color: '#fff',
    fontFamily: 'RalewayBold',
    fontSize: 18,
  },
  MenuItem:{
   // paddingHorizontal: 10,
    color: '#fff',
    //textAlign:'left',
    fontSize:14,
    fontFamily:'RalewayRegular',
    //marginLeft:20,
   // width:200,
  // marginTop:3
  },
  Menuactive:{
    color: '#b2b3b3',
   // textAlign:'left',
    fontSize:14,
    fontFamily:'RalewayRegular',
   // width:200,
  //  marginLeft:20,
   // marginTop:3

  }

});


export default (connect(MapSateProps,mapDispatch))(HomeScreen);