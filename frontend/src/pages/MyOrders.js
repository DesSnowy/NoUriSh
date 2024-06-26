import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import OrderDetails from '../components/OrderDetails';

const BASE_API_URL = process.env.REACT_APP_API_URL;

const MyOrders = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/order/`, {
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
      <h2 className="mt-4 ml-10 mb-4 text-3xl font-semibold">My Orders</h2>
      {error && <div className="error">{error}</div>}
      {orders.length === 0 ? (
        <div className="ml-4">No orders found.</div>
      ) : (
        <div className="ml-4 mr-4 flex flex-wrap">
          {orders.map(order => (
            <OrderDetails key={order.id} order = {order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

