import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const MyOrders = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/orders/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          setOrders(json);
        } else {
          setError(json.error);
        }
      } catch (err) {
        setError("Failed to fetch orders");
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div>
      <h1>My Orders</h1>
      {error && <div className="error">{error}</div>}
      {orders.length === 0 ? (
        <div>No orders found</div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} className="order">
              <h3>Order ID: {order.id}</h3>
              <p>Canteen: {order.canteen}</p>
              <p>Stall: {order.stall}</p>
              <p>Food Item: {order.foodItem}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Price: ${order.price}</p>
              <p>Group: {order.group}</p>
              <p>Ordered at: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

