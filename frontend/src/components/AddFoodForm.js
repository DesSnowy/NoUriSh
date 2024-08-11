import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const AddFood = ({ onClose }) => {
  const [foodName, setFoodName] = useState("");
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0);
  const [canteenId, setCanteenId] = useState(0);
  const [stallId, setStallId] = useState(0);
  const [stalls, setStalls] = useState([]);
  const [canteens, setCanteens] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCanteens = async () => {
      if (user) {
        const response = await fetch(`${BASE_API_URL}/api/canteen/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          setCanteens(json);
        }
      }
    };

    fetchCanteens();
  }, [user]);

  useEffect(() => {
    const fetchStalls = async () => {
      if (canteenId) {
        const response = await fetch(`${BASE_API_URL}/api/stall/${canteenId}/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          setStalls(json);
        }
      }
    };

    fetchStalls();
  }, [canteenId, user]);

  const handleSubmitFood = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BASE_API_URL}/api/food/`, {
      method: "POST",
      body: JSON.stringify({ foodName, description, price, stallId }),
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
      setDescription("");
      setPrice(0);
      setStallId(0);
      setStalls([])
      setCanteens([])
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmitFood} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <label className="userInputHeading">Food name:</label>
      <input
        type="text"
        onChange={(e) => setFoodName(e.target.value)}
        value={foodName}
        className="userInput"
      />

      <label className="userInputHeading">Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="userInput"
      />

      <label className="userInputHeading">Price:</label>
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className="userInput"
      />

      <select
        onChange={(e) => setCanteenId(e.target.value)}
        value={canteenId}
        className="userInput mb-8"
      >
        <option value="">Canteen: </option>
        {canteens.length === 0 ? (
          <option value="" disabled>
            No canteens!
          </option>
        ) : (
          canteens.map((canteen) => (
            <option key={canteen.id} value={canteen.id}>
              {canteen.name}
            </option>
          ))
        )}
      </select>

      <select
        onChange={(e) => setStallId(e.target.value)}
        value={stallId}
        className="userInput mb-8"
      >
        <option value="">Stall: </option>
        {stalls.length === 0 ? (
          <option value="" disabled>
            No stalls!
          </option>
        ) : (
          stalls.map((stall) => (
            <option key={stall.id} value={stall.id}>
              {stall.name}
            </option>
          ))
        )}
      </select>

      <button className="button">Add food</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddFood;
