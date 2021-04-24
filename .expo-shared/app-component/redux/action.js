import * as actionType from './action-type';


export const ADD_TO_CART = (itemId) => (
    {
       type : actionType.ADD_TO_CART,
       payload : {
           id:itemId
       }
    }
)

export const REMOVE_FROM_CART = (itemId) => (
    {
       type : actionType.REMOVE_FROM_CART,
       payload : {
           id:itemId
       }
    }
)

export const QUANTITY_ANALYZE = (qty,itemId) => (
    {
       type : actionType.QUANTITY_ANALYZE,
       payload :{
           id:itemId,
           quantity:qty
       }
    }
)

export const PRODUCT_VIEW = (item) => (
    {
       type : actionType.PRODUCT_VIEW,
       payload :{
           id:item
       }
    }
)

