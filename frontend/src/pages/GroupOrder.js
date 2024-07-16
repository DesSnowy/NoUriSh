import React, { useState, useEffect } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderDetails from '../components/OrderDetails';
import ViewProfileButton from '../components/ViewProfileButton';

const BASE_API_URL = process.env.REACT_APP_API_URL;

const GroupOrder = () => {
    const { user } = useAuthContext();

    const [canteens, setCanteens] = useState([]);
    const [residence, setResidence] = useState("");
    const [email, setEmail] = useState("");
    const [canteen, setCanteen] = useState("");
    const [error, setError] = useState(null);
    const [hasActiveOrder, setHasActiveOrder] = useState(false);
    const [currCanteen, setCurrCanteen] = useState("");
    const [groupId, setGroupId] = useState("")
    const [orders, setOrders] = useState([]);
    const [hasIncompleteOrder, setHasIncompleteOrder] = useState(false)

    useEffect(() => {
      const fetchProfile = async () => {
        const response = await fetch(`${BASE_API_URL}/api/user/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          setResidence(json.residence);
          setEmail(json.email);
        }
      };

      const fetchCanteens = async () => {
        const response = await fetch(`${BASE_API_URL}/api/canteen/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json(); //array of canteen objects
        console.log(json);

        if (response.ok) {
          setCanteens(json);
        }
      };

      const checkActiveGroupOrder = async () => {
        const response = await fetch(`${BASE_API_URL}/api/group/solo/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        console.log(json);
        if (response.ok && json.incomplete) {
          setHasActiveOrder(json.status);
          setCurrCanteen(json.canteen_name);
          setGroupId(json.group_id);
          setHasIncompleteOrder(json.incomplete);
        }
      };

      if (user) {
        fetchProfile();
        fetchCanteens();
        checkActiveGroupOrder();
      }
    }, [user]);

    useEffect(() => {
      const fetchOrdersByGroupId = async () => {
        try {
          const response = await fetch(
            `${BASE_API_URL}/api/order/group/${groupId}/`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
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

      if (hasIncompleteOrder && groupId) {
        fetchOrdersByGroupId();
      }
    }, [user, groupId, hasActiveOrder]);

    const handleOpenOrder = async (e) => {
      e.preventDefault();
      const details = { canteen_id: canteen, residence, email };
      console.log(details);
      //fetch request to post new data
      const response = await fetch(`${BASE_API_URL}/api/group/`, {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setCanteen("");
        setError(null);
        toast.success("Group order created");
        console.log("Group order created successfully", json);
        setHasActiveOrder(true);
        setHasIncompleteOrder(true);
        setCurrCanteen(canteens.filter((c) => c.id == canteen)[0].name);
        setGroupId(json.id);
      }
    };

    const handleCloseOrder = async (e) => {
      e.preventDefault();

      const response = await fetch(`${BASE_API_URL}/api/group/close/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setError(null);
        setHasActiveOrder(false);
        toast.success("Group order closed");
      }
    };

    const handleCompleteOrder = async (e) => {
      e.preventDefault();

      const incompleteOrders = orders.filter(
        (order) => order.orderStatus !== "received"
      );
      if (incompleteOrders.length > 0) {
        setError(
          "Cannot complete order. All orders must have the status 'received'"
        );
        return;
      }

      const response = await fetch(`${BASE_API_URL}/api/group/complete/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setOrders([]);
        setHasIncompleteOrder(false);
        setHasActiveOrder(false);

        toast.success("Group order completed");
      }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
      const response = await fetch(
        `${BASE_API_URL}/api/order/${orderId}/status/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ orderStatus: newStatus }),
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setOrders(
          orders.map((order) =>
            order.id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      }
    };

    return (
      <>

        {hasActiveOrder || hasIncompleteOrder ? (
          <div>
            {hasActiveOrder && (
              <div>
                <p className="font-medium ml-4 mb-4 mt-4">
                  Your group order at {currCanteen} is currently open. Group ID:{" "}
                  {groupId}
                </p>
                <button className="button ml-4 mb-6" onClick={handleCloseOrder}>
                  Close group order
                </button>
              </div>
            )}
            {!hasActiveOrder && (
              <div>
                <p className="font-medium ml-4 mb-4 mt-4">
                  Your group order at {currCanteen} is closed. Group ID:{" "}
                  {groupId}
                </p>
              </div>
            )}

            {error && <div className="error">{error}</div>}

            <h2 className="ml-4 mb-4">Orders submitted to your group order:</h2>
            {error && <div className="error">{error}</div>}
            {orders.length === 0 ? (
              <div className="ml-4">No orders yet.</div>
            ) : (
              <div className="ml-4 mr-4 flex flex-wrap">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="ml-10 w-96 flex flex-col items-start gap-4 mb-4 p-4 border border-gray-300 bg-white rounded-lg shadow-lg"
                  >
                    <OrderDetails order={order} />
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="ordered">Ordered from stall</option>
                      <option value="collected">Collected from stall</option>
                      <option value="delivered">Delivered</option>
                      <option value="received">Received</option>
                    </select>
                    <ViewProfileButton
                      email={order.userEmail}
                      token={user.token}
                    />
                  </div>
                ))}
              </div>
            )}
            <button className="button ml-4 mb-6" onClick={handleCompleteOrder}>
              Complete group order
            </button>

          </div>
        ) : (
          <div>
            <form onSubmit={handleOpenOrder}>
              <select
                onChange={(e) => setCanteen(e.target.value)}
                value={canteen}
                className="userInput h-10 w-80 ml-4 mt-4 mb-5"
              >
                <option value="">Select canteen</option>
                {canteens.map((canteen) => (
                  <option key={canteen.id} value={canteen.id}>
                    {canteen.name}
                  </option>
                ))}
              </select>

              <button type="submit" className="button ml-4">
                Start group order
              </button>
              {error && <div className="error">{error}</div>}
            </form>
          </div>
        )}
      </>
    );
  }



export default GroupOrder
