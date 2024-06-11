import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useMenuContext } from '../hooks/useMenuContext'
import MenuDetails from '../components/MenuDetails'

const Menu = () => {
  const { canteenId, stallId } = useParams();
  const { menu, dispatch } = useMenuContext();

  useEffect(() => {
    // fetch menu for the given canteen ID and stall ID
    const fetchMenu = async () => {
      const response = await fetch(`${BASE_API_URL}api/food/${stallId}/${canteenId}`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MENU", payload: json });
      }
    };

    fetchMenu();
  }, [dispatch, canteenId, stallId]);

  return (
    <div>
      <h1>{canteenId}</h1>
      <h2>{stallId}</h2>
      <div className="menu">
          {menu &&
              menu.map((item) => (<MenuDetails key={item._id} item={item} />))}
      </div>
    </div>
  );
};

export default Menu