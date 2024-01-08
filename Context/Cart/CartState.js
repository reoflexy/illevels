import React, { useReducer } from "react";
import CartContext from './CartContext'
import CartReducer from './CartReducer'
import {ADD_TO_CART,SHOW_HIDE_CART,REMOVE_ITEM} from '../Types'

const CartState = ({children}) => {

const initialState = {
showCart: false,
cartItems: []
}

const [state, dispatch] = useReducer(CartReducer,initialState);

const AddToCart = (item) => {
    dispatch({type: ADD_TO_CART, payload: item})
}

const showHideCart = () => {
    dispatch({type: SHOW_HIDE_CART})
}

const removeItem = (id) => {
    dispatch({type: REMOVE_ITEM, payload: id})
}

return <CartContext.Provider 
    value={{
        showCart: state.showCart,
        cartItems: state.cartItems,
        AddToCart,
        showHideCart,
        removeItem,
    }}
    >
{children}
</CartContext.Provider>


}
export default CartState