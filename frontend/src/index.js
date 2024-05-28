import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import { OrderContextProvider } from './context/OrdersContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OrderContextProvider>
      <App />
    </OrderContextProvider>
  </React.StrictMode>
);

