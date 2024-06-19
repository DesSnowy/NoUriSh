import { useNavigate } from "react-router-dom";

const StallDetails = ({ stall, canteenId }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate(`/canteens/${canteenId}/stalls/${stall.stall_id}/menu`);
    };

    return (
      <div className="h-screen flex items-center bg-cover bg-center bg-no-repeat">
        <div className="flex flex-row justify-around space-x-5">
          <p>
            <button onClick={handleNavigate} className="text-3xl">
              {stall.stall_name}
            </button>
          </p>
        </div>
      </div>
    );
}

export default StallDetails