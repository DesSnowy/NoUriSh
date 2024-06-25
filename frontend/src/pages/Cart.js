'use client'
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Cart = () => {
  const { user } = useAuthContext();
  const { cartItems, dispatch } = useContext(CartContext);
  const { canteenId } = useParams();

  const [name, setName] = useState("");
  const [residence, setResidence] = useState("");
  const [tele, setTele] = useState("");
  console.log(cartItems);
  const [total, setTotal] = useState(0);
  const [groups, setGroups] = useState([])
  const [group, setGroup] = useState(0)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${BASE_API_URL}/api/user/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json(); //array of profile objects
      console.log(json);

      if (response.ok) {
        setName(json.name);
        setResidence(json.residence);
        setTele(json.tele);
      }
    };

    if (user) {
      fetchProfile();
    }
    setTotal(0);
    for (const item of cartItems) {
      setTotal((total) => total + item.price * item.quantity);
    }

    const fetchGroupOrders = async () => {
      const response = await fetch(`${BASE_API_URL}/api/group/${canteenId}/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setGroups(json);
      }
    };
    if (user) {
      fetchGroupOrders();
    }
  }, [user, cartItems]);

  const handleRemove = (indexToRemove) => {
    dispatch({ type: "REMOVE_CART_PRODUCT", payload: indexToRemove });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      //array of orders
      const orderItems = cartItems.map((item) => ({
        canteen: item.canteen_id,
        stall: item.stall_id,
        foodItem: item.name,
        price: item.price,
        quantity: item.quantity,
        tele: tele,
        group: group
      }));

      const orderDetails = {
        orders: orderItems,
        user: {
          email: user.email,
          name: name,
          residence: residence,
          tele: tele
        }
      };

      //fetch request to post new data
      const response = await fetch(`${BASE_API_URL}api/order/`, {
        method: "POST",
        body: JSON.stringify(orderDetails),
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
        console.log("Order submitted successfully", json);
      }
  };  

  return (
    <section className="mt-4 ml-10 mr-10">
      <h3 className="text-5xl font-semibold text-blue-500 border-b-2 border-gray-400 py-2 mb-4">Cart</h3>
      <div className="grid gap-4 grid-cols-2">
        <div>
          {cartItems?.length === 0 && <div>No items in cart</div>}
          {cartItems?.length > 0 &&
            cartItems.map((item) => (
              <div className="flex items-center justify-between gap-4 mb-2 border-b py-2 bg-white rounded-lg">
                <div className="flex items-center gap-4">
                  <h3 className="ml-4 text-lg font-semibold">{item.name}</h3>
                  <div className="text-gray-500">
                    <p>Canteen: {item.canteen_name}</p>
                    <p>Stall: {item.stall_name}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  className="button mr-4"
                  type="button"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>

            ))}
          <div className="py-2 text-right pr-16">
            <span className="text-gray-500">Total price:</span>
            <span className="text-lg font-semibold pl-2">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg space-y-3">
          <h2 className='text-xl font-semibold'>Checkout</h2>
          <form>
            <select
              onChange={(e) => setGroup(e.target.value)}
              value={group}
              className="userInput mb-8"
            >
              <option value="">Select group to join</option>
              {groups.length === 0 ? (
                <option value="" disabled>No active groups!</option>
              ) : (
                groups.map(group => (
                  <option key={group.group_id} value={group.group_id}>
                    {group.group_id}
                  </option>
                ))
              )}
            </select>

            <button type="submit" className="button" onSubmit={handleSubmit}>
              Submit order
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </section>
  );
};
 
export default Cart
