import { useParams } from "react-router-dom";
import StallDetails from "../components/StallDetails";
import { useEffect, useState } from "react";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Stalls = () => {
  const { canteenId } = useParams();
  const [stalls, setStalls] = useState(null);

  useEffect(() => {
    // fetch stalls for the given canteen ID
    const fetchStalls = async () => {
      const response = await fetch(`${BASE_API_URL}api/stall/${canteenId}`);
      const json = await response.json(); //array of stall objects

      if (response.ok) {
        setStalls(json);
      }
    };

    fetchStalls();
  }, [canteenId]);

  return (
    <div>
      <h1>{canteenId}</h1>
      <div className="stalls">
        {stalls &&
          stalls.map((stall) => (
            <StallDetails key={stall._id} stall={stall} canteenId={canteenId} />
          ))}
      </div>
    </div>
  );
};

export default Stalls;
