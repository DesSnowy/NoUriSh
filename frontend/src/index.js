import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import { OrdersContextProvider } from './context/OrdersContext';
import { AuthContextProvider } from './context/AuthContext';
import { ProfileContextProvider } from "./context/ProfileContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <OrdersContextProvider>
        <ProfileContextProvider>
          <App />
        </ProfileContextProvider>
      </OrdersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

