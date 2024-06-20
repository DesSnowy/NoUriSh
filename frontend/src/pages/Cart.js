'use client'
import React, { useContext, useState, useEffect } from 'react'
import { CartContext } from "../context/CartContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Cart = () => {
  const { user } = useAuthContext();
  const { cartItems, dispatch } = useContext(CartContext);

  const [name, setName] = useState("");
  const [residence, setResidence] = useState("");
  const [tele, setTele] = useState("");
  console.log(cartItems);
  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.quantity;
  }

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
  }, [user]);

  const handleRemove = (indexToRemove) => {
    dispatch({ type: "REMOVE_CART_PRODUCT", payload: indexToRemove });
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
                <h3 className="font-semibold">{item.food_name}</h3>
                <div className="text-lg font-semibold">
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
            <label className="userInputHeading">Name: </label>
            <b>{name}</b>

            <label className="userInputHeading">Residence: </label>
            <b>{residence}</b>

            <label className="userInputHeading">Telegram handle: </label>
            <b>{tele}</b>

            <button type="submit" className="button">
              Submit order
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
 
export default Cart
