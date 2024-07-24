'use client'
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import ViewProfileButton from '../components/ViewProfileButton';

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Cart = () => {
  const { user } = useAuthContext();
  const { cartItems, dispatch } = useContext(CartContext);

  const [name, setName] = useState("");
  const [residence, setResidence] = useState("");
  const [tele, setTele] = useState("");
  console.log(cartItems);
  const [total, setTotal] = useState(0);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState(0);
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

    const fetchGroupOrders = async () => {
      const response = await fetch(
        `${BASE_API_URL}/api/group/${cartItems[0].canteen_id}/`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setGroups(json);
      }
    };
    setTotal(0);
    for (const item of cartItems) {
      setTotal((total) => total + item.price * item.quantity);
    }
    if (user) {
      fetchProfile();
    }
    if (user && cartItems.length > 0) {
      fetchGroupOrders();
    }
  }, [user, cartItems]);

  const handleRemove = (indexToRemove) => {
    dispatch({ type: "REMOVE_CART_PRODUCT", payload: indexToRemove });
    toast.success("item successfully removed");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length == 0) {
      return toast.error("no item in cart");
    }

    if (group == 0) {
      return toast.error("Please select a group");
    }

    //array of orders
    const orderItems = cartItems.map((item) => ({
      canteen: item.canteen_name,
      stall: item.stall_name,
      foodItem: item.name,
      price: item.price,
      quantity: item.quantity,
      group: group,
    }));
    console.log(orderItems);

    //fetch request to post new data
    const response = await fetch(`${BASE_API_URL}/api/order/`, {
      method: "POST",
      body: JSON.stringify(orderItems),
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
      dispatch({ type: "CLEAR_CART" });
      toast.success("Order submitted successfully");
    }
  };

  return (
    <section className="mt-4 ml-10 mr-10">
      <h3 className="text-4xl font-semibold border-b-2 border-gray-400 py-2 mb-4">
        Cart
      </h3>
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
          <h2 className="text-xl font-semibold">Checkout</h2>
          <form onSubmit={handleSubmit}>
            <select
              onChange={(e) => setGroup(e.target.value)}
              value={group}
              className="userInput mb-8"
            >
              <option value="">Select group to join</option>
              {groups.length === 0 ? (
                <option value="" disabled>
                  No active groups!
                </option>
              ) : (
                groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.id}
                  </option>
                ))
              )}
            </select>

            <button type="submit" className="button">
              Submit order
            </button>
            {error && <div className="error">{error}</div>}
          </form>

          <h3 className="text-large font-semibold">Active groups</h3>
          {groups.length === 0 ? (
            <div className="">No active groups!</div>
          ) : (
            groups.map((group) => (
              <div className="mb-2" key={group.id} value={group.id}>
                {group.id}
                <ViewProfileButton email={group.email} token={user.token} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
 
export default Cart
