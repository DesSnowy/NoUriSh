import { useEffect, useState } from "react";
import CanteenDetails from "../components/CanteenDetails";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Canteens = () => {
  const [canteens, setCanteens] = useState(null);
  useEffect(() => {
    const fetchCanteens = async () => {
      const response = await fetch(`${BASE_API_URL}api/canteen/`);
      const json = await response.json(); //array of canteen objects

      if (response.ok) {
        setCanteens(json);
      }
    };

    fetchCanteens();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-around">
        <div className="canteens">
          {canteens &&
            canteens.map((canteen) => (
              <CanteenDetails key={canteen._id} canteen={canteen} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Canteens;
