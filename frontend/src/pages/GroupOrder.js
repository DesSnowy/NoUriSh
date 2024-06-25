import React, { useState, useEffect } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const GroupOrder = () => {
    const { user } = useAuthContext();

    const [canteens, setCanteens] = useState([]);
    const [residence, setResidence] = useState("");
    const [email, setEmail] = useState("");
    const [canteen, setCanteen] = useState("");
    const [error, setError] = useState(null);

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
        if (user) {
          fetchProfile();
        }

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
          if (user) {
            fetchCanteens();
          }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const details = { canteen_id: canteen, residence, email }; 

        //fetch request to post new data
        const response = await fetch(`${BASE_API_URL}api/group/`, {
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
          console.log("Group order created successfully", json);
        }
    };  

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
  );
}

export default GroupOrder
