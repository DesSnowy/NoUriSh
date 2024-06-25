import React, { useState, useEffect } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const GroupOrder = () => {
    const { user } = useAuthContext();

    const [canteens, setCanteens] = useState([]);
    const [residence, setResidence] = useState("");
    const [email, setEmail] = useState("");
    const [canteen, setCanteen] = useState("");
    const [error, setError] = useState(null);
    const [hasActiveOrder, setHasActiveOrder] = useState(false);
    const [currCanteen, setCurrCanteen] = useState("")

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

      const checkActiveGroupOrder = async () => {
        const response = await fetch(`${BASE_API_URL}/api/group/solo/`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        console.log(json);
        if (response.ok && json.status) {
          setHasActiveOrder(true);
          setCurrCanteen(json.canteen_name);
        }
      };

      if (user) {
        fetchProfile();
        fetchCanteens();
        checkActiveGroupOrder();
      }
    }, [user]);

    const handleOpenOrder = async (e) => {
      e.preventDefault();

      const details = { canteen_id: canteen, residence, email };

      //fetch request to post new data
      const response = await fetch(`${BASE_API_URL}/api/group/`, {
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
        toast.success("Group order created");
        console.log("Group order created successfully", json);
        setHasActiveOrder(true);
        setCurrCanteen(canteen);
      }
    };

    const handleCloseOrder = async (e) => {
      e.preventDefault();

      const response = await fetch(`${BASE_API_URL}/api/group/close/`, {
        method: "PATCH",
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
        setHasActiveOrder(false);
        setError(null);
      }
    };

    return (
      <>
        {hasActiveOrder ? (
          <div>
            <p className="font-medium ml-4 mb-4 mt-4">
              Your group order at {currCanteen} is currently open.
            </p>
            <button className="button ml-4" onClick={handleCloseOrder}>
              Close group order
            </button>
            {error && <div className="error">{error}</div>}
          </div>
        ) : (
          <div>
            <form onSubmit={handleOpenOrder}>
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
        )}
      </>
    );
}

export default GroupOrder
