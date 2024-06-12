import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import MenuDetails from "../components/MenuDetails";
import { useAuthContext } from "../hooks/useAuthContext";

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Menu = () => {
  const { canteenId, stallId } = useParams();
  const [menu, setMenu] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    // fetch menu for the given canteen ID and stall ID
    const fetchMenu = async () => {
      const response = await fetch(`${BASE_API_URL}/api/food/${stallId}/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setMenu(json);
      }
    };
    if (user) {
      fetchMenu();
    }
  }, [user, stallId]);

  return (
    <div>
      <h1>{canteenId}</h1>
      <h2>{stallId}</h2>
      <div className="menu">
        {menu && menu.map((item) => <MenuDetails key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default Menu