import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import OrderDetails from '../components/OrderDetails';
import ViewProfileButton from '../components/ViewProfileButton';
import LoadingSign from "../components/LoadingSign";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const MyOrders = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="mt-4 ml-10 mr-10">
      <h3 className="text-4xl font-semibold border-b-2 border-gray-400 py-2 mb-4">
        My Orders
      </h3>
      {error && <div className="error">{error}</div>}
      {isLoading ? (
        <LoadingSign />
      ) : (
        <div>
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
      )}
    </div>
  );
};

export default MyOrders;

