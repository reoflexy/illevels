import { ADD_TO_CART, SHOW_HIDE_CART, REMOVE_ITEM, EMPTY_CART, ADD_COUNT, REDUCE_COUNT } from "../Types";

const CartReducer = (state, action) => {
  switch (action.type) {
    case SHOW_HIDE_CART: {
      return {
        ...state,
        showCart: !state.showCart,
      };
    }
    case ADD_TO_CART: {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }

    case REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.name !== action.payload),
      };
    }

    // case ADD_COUNT: {
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map((obj) => {
    //         if(obj.name == action.payload){
    //           obj.count++
    //         }
    //     })
    //   };
    // }

    // case REDUCE_COUNT: {
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map((obj) => {
    //         if(obj.name == action.payload){
             
    //             obj.count++
    //         }
    //     })
    //   };
    // }
   

    case EMPTY_CART: {
      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
