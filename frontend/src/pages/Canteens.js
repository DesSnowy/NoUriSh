import React from 'react'
import { useEffect } from 'react'
import { useCanteensContext } from '../hooks/useCanteensContext'
import CanteenDetails from '../components/CanteenDetails'

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Canteens = () => {
  const { canteens, dispatch } = useCanteensContext();

  useEffect(() => {
    const fetchCanteens = async () => {
      const response = await fetch(`${BASE_API_URL}api/canteen/`);
      const json = await response.json(); //array of canteen objects

      if (response.ok) {
        dispatch({ type: "SET_CANTEENS", payload: json });
      }
    };
    
    fetchCanteens();
  }, [dispatch]);

  return (
    <div>
      <div className="flex flex-row justify-around">
        <div className="canteens">
          {canteens &&
            canteens.map((canteen) => <CanteenDetails key={canteen._id} canteen={canteen} />)}
        </div>
      </div>
    </div>
  );
};

export default Canteens
