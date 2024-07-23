import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const AddCanteen = ({ onClose }) => {
    const [canteenName, setCanteenName] = useState("")
    const [canteenImage, setCanteenImage] = useState("")
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    const handleSubmitCanteen = async (e) => {
      e.preventDefault()

      const response = await fetch(`${BASE_API_URL}/api/canteen/`, {
        method: "POST",
        body: JSON.stringify({ canteenName, canteenImage }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null)
        toast.success("Canteen added successfully")
        setCanteenName("");
        setCanteenImage("");
        onClose(); 
      }
    }

  return (
    <form onSubmit={handleSubmitCanteen} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
        <label className="userInputHeading">Canteen name:</label>
        <input
          type="text"
          onChange={(e) => setCanteenName(e.target.value)}
          value={canteenName}
          className="userInput"
        />

        <label className="userInputHeading">Canteen image URL:</label>
        <input
          type="url"
          onChange={(e) => setCanteenImage(e.target.value)}
          value={canteenImage}
          className="userInput"
        />    

        <button className='button'>
          Add canteen
        </button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddCanteen
