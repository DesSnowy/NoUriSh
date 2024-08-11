import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const AddStall = ({ onClose }) => {
    const [stallName, setStallName] = useState("")
    const [canteenId, setCanteenId] = useState(0)
    const [canteens, setCanteens] = useState([])
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
      const fetchCanteens = async () => {
        const response = await fetch(`${BASE_API_URL}/api/canteen/`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();
        console.log(json);
  
        if (response.ok) {
          setCanteens(json);
        }
      };
      
      if (user) {
        fetchCanteens();
      }
    }, [user]);

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
        setCanteens([])
        onClose(); 
      }
    }

  return (
    <form onSubmit={handleSubmitStall} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
        <label className="userInputHeading">Stall name:</label>
        <input
          type="text"
          onChange={(e) => setStallName(e.target.value)}
          value={stallName}
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

        <button className='button'>
          Add stall
        </button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AddStall