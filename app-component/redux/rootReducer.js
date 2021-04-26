import {combineReducers} from 'redux';
import * as actionType from './action-type';

 
const INITIAL_STATE = {
  products: [
    {
        productId:1,  
        productName: 'Black Printed Tshirt',
        productPrice: 19.49,
        productImage:
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
      },
      {
        productId:2,  
        productName: 'Black Printed Top (Women)',
        productPrice: 19.49,
        productImage:
          'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=90',
      },
      { 
        productId:3,
        productName: 'White Solid Tshirt',
        productPrice: 34.99,
        productImage:
          'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
      },
      {
        productId:4,  
        productName: 'Black Solid Tshirt',
        productPrice: 34.99,
        productImage:
          'https://images.unsplash.com/photo-1512327428889-607eeb19efe8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
      },
      {
        productId:5,  
        productName: 'Red Top (Women)',
        productPrice: 44.85,
        productImage:
          'https://images.unsplash.com/photo-1456885284447-7dd4bb8720bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60',
      },
  ],
  cart : [],
  currentItem :{}

 
};
 
const shopReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case actionType.ADD_TO_CART : 
        
        const item = state.products.find((ele) => ele.productId === action.payload.id );
        

        const  isInCart = state.cart.find( (ele) => ele.productId === action.payload.id) ? true : false
        
        return {
          
            ...state,
            cart : isInCart ?//if true
                  state.cart.map(e => e.productId === action.payload.id ? {...e, quantity : e.quantity + 1}:e)
                  
                  ://else part
                 [...state.cart,{...item,quantity:1}
                       ]}
                             
    
    case actionType.REMOVE_FROM_CART : 
        return  {
            ...state,
            cart : state.cart.filter(e => e.productId!== action.payload.id),
        }
    
    case actionType.QUANTITY_ANALYZE : {
        return  {
            ...state,
            cart : state.cart.map(ele => ele.productId === action.payload.id ? {...ele ,quantity:action.payload.quantity}: ele)

        }
    }
    case actionType.PRODUCT_VIEW : {
        return  {
            ...state,
            currentItem:action.payload,

        }
    }
    default:
      return state;
  }
};
 
const eReducer = combineReducers({

    shop : shopReducer
});

export default eReducer;