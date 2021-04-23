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
  Dimensions,
  useWindowDimensions

} from 'react-native';

import Constants from 'expo-constants';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';

import { useFonts } from 'expo-font';

import RalewayRegular from '../../assets/fonts/Montserrat/Raleway-Regular.ttf';
import RalewayBold from '../../assets/fonts/Montserrat/Raleway-Bold.ttf';
import RalewayExtraBold from '../../assets/fonts/Montserrat/Raleway-ExtraBold.ttf';


export const windowWidthPx = Dimensions.get('window').width/100;
export const windowHeightPx = Dimensions.get('window').height/100;









const Rating = ({ rating, maxRating }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array(rating)
        .fill(1)
        .map((el) => (
          <FAIcon name='star' size={20} color='#2e2e2e' />
        ))}
      {Array(maxRating - rating)
        .fill(1)
        .map((el) => (
          <FAIcon name='star-o' size={20} color='#2e2e2e' />
        ))}
    </View>
  );
};

export default function ProductScreen({navigation,route}) {

    const { productId} = route.params;
    const [newProductId,setNewProductId]=useState(productId)
   // console.log(newProductId);
    const [productDetails, setProductDetails] = useState([]);
   useEffect(() => {
    //console.log('im working');
   // im here
   setProductDetails(moreProducts.filter(ele =>  ele.productId == newProductId ))
  
   }, [newProductId])
  const [loaded] = useFonts({
    RalewayRegular,
    RalewayBold,
    RalewayExtraBold,
  });
  console.log(productDetails);

 const __productUpdate = async(id)=>{
     console.log(id);
     setNewProductId(id); ///just set the id the useEffect set details automatically
  }

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

  const [moreProducts] = useState([
    {
      productId:1,  
      productName: 'Black Printed Tshirt',
      productPrice: 19.49,
      productImage:
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
      size : ['S','M','L','XL','XXL']
    },
    {
      productId:2,  
      productName: 'Black Printed Top (Women)',
      productPrice: 19.49,
      productImage:
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=90',
      size : ['S','M','L','XL','XXL']
    },
    { 
      productId:3,
      productName: 'White Solid Tshirt',
      productPrice: 34.99,
      productImage:
        'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
      size : ['S','M','L','XL','XXL']  
    },
    {
      productId:4,  
      productName: 'Black Solid Tshirt',
      productPrice: 34.99,
      productImage:
        'https://images.unsplash.com/photo-1512327428889-607eeb19efe8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
      size : ['S','M','L','XL','XXL']
    },
    {
      productId:5,  
      productName: 'Red Top (Women)',
      productPrice: 44.85,
      productImage:
        'https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
        size : ['S','M','L','XL','XXL']
    },
  ]);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#fff');
  }, []);

  const [showMenu, isShowMenu] = useState(false);
const  __handleMenu = () =>{
   isShowMenu(true);
   animate();
}
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
      
      <View style={{flex:1,backgroundColor:'#7bad9a'}}>
      <View style={styles.header}>
      <FAIcon name='close' size={30} color={'#7bad9a'}  onPress={() => isShowMenu(false)} />
         
        <Text style={styles.headerTitle}>IStore</Text>
        <Icon name='shopping-bag' size={26} color={'#7bad9a'} />
      </View>
      <Animated.View  style={
        {
          flex:1,
          height:'100%',
          marginLeft:easeAnim,
        }
      }>
      <View style={{flex:1,height:'100%', width:200,justifyContent:'space-evenly',alignItems:'flex-start',marginTop:60,backgroundColor:'#7bad9a'}}>
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
      </Animated.View>
    </View>
   
    );
  }
*/
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
    <View style={{ flex: 1 ,
    flexDirection:"row",
   // overflow:'hidden'
    zIndex:9999,
    }}>
      
      {showMenu==true?Rendermenu: <View></View>}
   
      
    <View  style={{flex: 1,zIndex:1}} >
      <View style={styles.header}>
        <Icon name='menu' size={30} onPress={__handleMenu} color={'#7bad9a'} />
         
        <Text style={styles.headerTitle}>IStore</Text>
        <Icon name='shopping-bag' size={26} color={'#7bad9a'}  />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1,zIndex:1}}>
      {productDetails.map(e => 
        <View>
        <View>
          <Image
            style={{ height: 500, resizeMode: 'cover' }}
            source={{
              uri:
                e.productImage,
            }}
          />
        </View>
        <View style={styles.detailsView}>
        <View style={styles.productTitleView}>
          <Text style={styles.productTitle}>{e.productName}</Text>
          <TouchableOpacity onPress={() => setFavourite(!isFavourite)}>
            <FAIcon name={isFavourite ? 'heart' : 'heart-o'} size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.productPriceView}>
          <Text style={styles.discountedPriceText}>{e.productPrice}</Text>
          <Text style={styles.actualPriceText}>{e.productPrice}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Rating rating={4} maxRating={5} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'RalewayBold',
              marginBottom: 10,
            }}
          >
            Size:
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {e.size.map((s,index) => (
              <TouchableOpacity
                key={index}
                style={
                  selectedSize === s ? styles.tagSelected : styles.tag
                }
                onPress={() => setSelectedSize(s)}
              >
                <Text
                  style={
                    selectedSize === s
                      ? styles.tagLabelSelected
                      : styles.tagLabel
                  }
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
      <TouchableOpacity style={styles.buyNowButton}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={[styles.buttonText, { color: '#7bad9a' }]}>
          Add to Cart
        </Text>
      </TouchableOpacity>
    </View>
    <View style={{ marginTop: 10, backgroundColor: '#fff' }}>
      <TouchableOpacity
        style={styles.productDescriptionHeader}
        onPress={() => setSeeFullDescription((prev) => !prev)}
      >
        <Text style={{ fontFamily: 'RalewayBold', fontSize: 18 }}>
          Product Description
        </Text>
        <TouchableOpacity
          onPress={() => setSeeFullDescription((prev) => !prev)}
        >
          {seeFullDescription ? (
            <Icon name='chevron-up' size={26} />
          ) : (
            <Icon name='chevron-down' size={26} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: 'RalewayRegular' }}>
          {seeFullDescription
            ? `${productDescription}`
            : `${productDescription.split('\n')[0]}`}
        </Text>
      </View>
    </View>
    </View>
        
        )}
        
        
        
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontFamily: 'RalewayBold',
              fontSize: 20,
              marginHorizontal: 10,
            }}
          >
            More Products
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, flexDirection: 'row', paddingTop: 10 }}>
              {moreProducts.map((item) => (
                <View key={item.productId} style={{ width: 180, marginHorizontal: 10 }}>
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
                        <Icon
                          style={styles.moreProductIcon}
                          name='shopping-bag'
                          size={18}
                        />
                        <Icon
                          style={styles.moreProductIcon}
                          name='share'
                          size={18}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.moreProductBuyButton} onPress={()=>__productUpdate(item.productId)}>
                    <Text style={styles.moreProductBuyButtonText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ height: 40 }}></View>
      </ScrollView>
    </View>
    </View>
  );
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
    backgroundColor: '#7bad9a',
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
    borderColor: '#7bad9a',
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
    backgroundColor: '#7bad9a',
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

});