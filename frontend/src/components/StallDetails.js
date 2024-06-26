import { useNavigate } from "react-router-dom";

const StallDetails = ({ stall, canteenId }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate(`/canteens/${canteenId}/stalls/${stall.id}/menu`);
    };

    const firstPartOfStallName = stall.name.split('_')[0];

    return (
      <div className="ml-4 mt-4 bg-blue-200 p-8 w-96 rounded-lg h-30 flex items-center bg-cover bg-center bg-no-repeat">
        <div className="flex flex-row justify-around space-x-5">
          <h1 className="text-3xl font-semibold">{firstPartOfStallName}</h1>
          <button onClick={handleNavigate} className="button">
            View menu
          </button>
        </div>
      </div>
    );
}

export default StallDetails