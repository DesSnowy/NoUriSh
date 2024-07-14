import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const AddStall = ({ onClose }) => {
    const [stallName, setStallName] = useState("")
    const [canteenId, setCanteenId] = useState(0)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    const handleSubmitStall = async (e) => {
      e.preventDefault()
      console.log("submitted")

      const response = await fetch(`${BASE_API_URL}/api/stall/`, {
        method: "POST",
        body: JSON.stringify({ stallName, canteenId }),
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
        toast.success("Stall added successfully")
        setStallName("");
        setCanteenId(0);
        onClose(); 
      }
    }

  return (
    <form onSubmit={handleSubmitStall}>
        <label className="userInputHeading">Stall name:</label>
        <input
          type="text"
          onChange={(e) => setStallName(e.target.value)}
          value={stallName}
          className="userInput"
        />

        <label className="userInputHeading">Canteen ID:</label>
        <input
          type="number"
          onChange={(e) => setCanteenId(e.target.value)}
          value={canteenId}
          className="userInput"
        />    

        <button className='button'>
          Add stall
        </button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddStall