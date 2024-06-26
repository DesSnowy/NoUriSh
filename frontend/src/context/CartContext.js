import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { item, quantity } = action.payload;
      const existingItem = state.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return state.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...state, { ...item, quantity }];
      }

    case "CLEAR_CART":
      return [];

    case "REMOVE_CART_PRODUCT":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  // const [cartItems, setCartItems] = useState([]);

  // function clearCart() {
  //   setCartItems([]);
  // }

  // function removeCartProduct(indexToRemove) {
  //   dispatch({ type: "REMOVE_CART_PRODUCT", payload: indexToRemove });
  // }

  // const addToCart = (item, quantity) => {
  //   console.log(item);
  //   dispatch({ type: "ADD_TO_CART", payload: { item, quantity } });
  // };

  return (
    <CartContext.Provider value={{ cartItems, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
