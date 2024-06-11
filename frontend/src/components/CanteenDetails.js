import { useNavigate } from "react-router-dom";

const CanteenDetails = ({ canteen }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
      navigate(`/canteens/${canteen._id}/stalls`);
    };

    return (
      <div className="h-screen flex items-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${canteen.image})`}}>
        <div className="flex flex-row justify-around space-x-5">
          <p>
            <button onClick={handleNavigate()} className="text-3xl">{canteen.name}</button>
          </p>
        </div>
      </div>
    );
}

export default CanteenDetails