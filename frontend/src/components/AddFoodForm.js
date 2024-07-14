import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const AddFood = ({ onClose }) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState(0);
  const [stallId, setStallId] = useState(0);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmitFood = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BASE_API_URL}/api/food/`, {
      method: "POST",
      body: JSON.stringify({ foodName, price, stallId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      toast.success("Food added successfully");
      setFoodName("");
      setPrice(0);
      setStallId(0);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmitFood}>
      <label className="userInputHeading">Food name:</label>
      <input
        type="text"
        onChange={(e) => setFoodName(e.target.value)}
        value={foodName}
        className="userInput"
      />

      <label className="userInputHeading">Price:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className="userInput"
      />

      <label className="userInputHeading">Stall ID:</label>
      <input
        type="number"
        onChange={(e) => setStallId(e.target.value)}
        value={stallId}
        className="userInput"
      />

      <button className="button">Add food</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddFood;
