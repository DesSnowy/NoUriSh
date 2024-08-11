import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import MenuDetails from "../components/MenuDetails";
import { useAuthContext } from "../hooks/useAuthContext";
import LoadingSign from "../components/LoadingSign";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Menu = () => {
  const { canteenId, stallId } = useParams();
  const [menu, setMenu] = useState(null);
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch menu for the given canteen ID and stall ID
    setIsLoading(true);
    const fetchMenu = async () => {
      const response = await fetch(`${BASE_API_URL}/api/food/${stallId}/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setMenu(json);
        setIsLoading(false);
      }
    };
    if (user) {
      fetchMenu();
    }
  }, [user, stallId]);

  return (
    <div>
      {isLoading ? (
        <LoadingSign />
      ) : (
        <div className="menu">
          {menu &&
            menu.map((item) => <MenuDetails key={item.id} item={item} />)}
        </div>
      )}
    </div>
  );
};

export default Menu