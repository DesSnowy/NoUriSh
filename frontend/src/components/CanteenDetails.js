import { useNavigate } from "react-router-dom";

const CanteenDetails = ({ canteen }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate(`/canteens/${canteen.id}/stalls`);
    };

    return (
      <div className="h-60 w-screen flex items-center ml-4 mb-4 mr-10 justify-left bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${canteen.image})`,
          borderRadius: '1rem', // Rounded corners
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow for depth
        }}
      >
        <div className="ml-4 bg-white bg-opacity-90 p-8 w-60 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold">{canteen.name}</h1>
          <p className="text-lg">Active Groups: {canteen.activeGroups}</p>
          <button
            onClick={handleNavigate}
            className="button"
          >
            View Stalls
          </button>
        </div>
      </div>

    );
}

export default CanteenDetails