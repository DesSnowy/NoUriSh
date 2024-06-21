import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import { OrdersContextProvider } from './context/OrdersContext';
import { AuthContextProvider } from "./context/AuthContext";
import { CartContextProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <OrdersContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </OrdersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

