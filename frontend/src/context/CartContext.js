import { createContext, useState, useReducer } from "react";
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const { item, quantity } = action.payload;
        const existingItem = state.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
          return state.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          );
        } else {
          return [...state, { ...item, quantity }];
        }
      default:
        return state;
    }
  };

export const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [cartItems, setCartItems] = useState([])

  function clearCart() {
    setCartItems([])
  }

  function removeCartProduct(indexToRemove) {
    setCartItems(prevItems => {
        const newItems = prevItems
            .filter((value, index) => index !== indexToRemove)
        return newItems})
    toast.success('Item removed from cart');
  }

  const addToCart = (item, quantity) => {
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
  };

  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};