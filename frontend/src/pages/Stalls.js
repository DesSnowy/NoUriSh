import { useParams } from "react-router-dom";
import StallDetails from "../components/StallDetails";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import LoadingSign from "../components/LoadingSign";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Stalls = () => {
  const { canteenId } = useParams();
  const [stalls, setStalls] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();

  useEffect(() => {
    // fetch stalls for the given canteen ID
    const fetchStalls = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/api/stall/${canteenId}/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json(); //array of stall objects
      console.log(json);
      if (response.ok) {
        setStalls(json);
        setIsLoading(false);
      }
    };
    if (user) {
      fetchStalls();
    }
  }, [canteenId, user]);

  return (
    <div>
      {isLoading ? (
        <LoadingSign />
      ) : (
        <div className="stalls">
          {stalls &&
            stalls.map((stall) => (
              <StallDetails
                key={stall.id}
                stall={stall}
                canteenId={canteenId}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Stalls;
