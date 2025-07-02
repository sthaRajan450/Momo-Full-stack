import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      const exists = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (exists) {
        return state;
      } else {
        const newCart = [...state.cartItems, action.payload];
        alert("Product is added to cart");
        return {
          cartItems: newCart,
        };
      }

    case "remove":
      return {
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
      };

    case "increment":
      return {
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "decrement":
      return {
        cartItems: state.cartItems.map((item) =>
          item._id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case "clear":
      return {
        cartItems: [],
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
