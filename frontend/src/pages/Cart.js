'use client'
import React, { useContext, useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";

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

    //array of orders
    const orderItems = cartItems.map((item) => ({
      canteen: item.canteen_name,
      stall: item.stall_name,
      foodItem: item.name,
      price: item.price,
      quantity: item.quantity,
      group: group,
    }));

    //fetch request to post new data
    const response = await fetch(`${BASE_API_URL}api/order/`, {
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
      console.log("Order submitted successfully", json);
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-5xl font-bold">Cart</h1>
      <div className="grid gap-4 grid-cols-2">
        <div>
          {cartItems?.length === 0 && <div>No items in cart</div>}
          {cartItems?.length > 0 &&
            cartItems.map((item) => (
              <div className="flex items-center gap-4 mb-2 border-b py-2">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="text-lg font-semibold">
                  <p>Canteen: {item.canteen_name}</p>
                  <p>Stall: {item.stall_name}</p>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  className="button p-2 ml-2"
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
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <select
              onChange={(e) => setGroup(e.target.value)}
              value={group}
              className="userInput"
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

            <label className="userInputHeading">Name: </label>
            <b>{name}</b>

            <label className="userInputHeading">Residence: </label>
            <b>{residence}</b>

            <label className="userInputHeading">Telegram handle: </label>
            <b>{tele}</b>

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
