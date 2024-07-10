import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import OrderDetails from '../components/OrderDetails';
import ViewProfileButton from '../components/ViewProfileButton';

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
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <div className="ml-10 w-96 flex flex-col items-start gap-4 mb-4 p-4 border border-gray-300 bg-white rounded-lg shadow-lg">
                <OrderDetails key={order.id} order={order} />
                <ViewProfileButton
                  email={order.groupEmail}
                  token={user.token}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

