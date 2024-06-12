import { useEffect, useState } from "react";
import CanteenDetails from "../components/CanteenDetails";
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Canteens = () => {
  const [canteens, setCanteens] = useState(null);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchCanteens = async () => {
      const response = await fetch(`${BASE_API_URL}api/canteen/`, {
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

  return (
    <div>
      <div className="flex flex-row justify-around">
        <div className="canteens">
          {canteens &&
            canteens.map((canteen) => (
              <CanteenDetails key={canteen.id} canteen={canteen} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Canteens;
