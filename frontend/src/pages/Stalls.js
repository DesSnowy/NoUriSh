import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useStallsContext } from '../hooks/useStallsContext'
import StallDetails from '../components/StallDetails'

const BASE_API_URL = process.env.REACT_APP_API_URL;

const Stalls = () => {
  const { canteenId } = useParams();
  const { stalls, dispatch } = useStallsContext();

  useEffect(() => {
    // fetch stalls for the given canteen ID
    const fetchStalls = async () => {
      const response = await fetch(`${BASE_API_URL}api/stall/${canteenId}`)
      const json = await response.json(); //array of stall objects

      if (response.ok) {
        dispatch({ type: "SET_STALLS", payload: json });
      }
    };

    fetchStalls();
  }, [dispatch, canteenId]);

  return (
    <div>
      <h1>{canteenId}</h1>
        <div className="stalls">
            {stalls &&
                stalls.map((stall) => <StallDetails key={stall._id} stall={stall} canteenId={canteenId}/>)}
        </div>
    </div>
  );
};

export default Stalls
