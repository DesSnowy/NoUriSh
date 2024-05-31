import { useState } from "react"
import { useOrdersContext } from '../hooks/useOrdersContext'
import { useAuthContext } from "../hooks/useAuthContext";

const OrderForm = () => {
    const { dispatch } = useOrdersContext();
    const { user } = useAuthContext()

    const [canteen, setCanteen] = useState("");
    const [stall, setStall] = useState("");
    const [foodItem, setFoodItem] = useState("");
    const [price, setPrice] = useState("");
    const [tele, setTele] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!user) {
        setError('You must be logged in')
        return
      }

      const order = { canteen, stall, foodItem, price, tele }

      //fetch request to post new data
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setCanteen("");
        setStall("");
        setFoodItem("");
        setPrice("");
        setTele("");
        setError(null);
        console.log("Order added", json);
        dispatch({ type: "CREATE_ORDER", payload: json });
      }
    };
    
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add an Order</h3>

            <label>Canteen: </label>
            <input 
                type="text"
                onChange={(e) => setCanteen(e.target.value)}
                value={canteen}
            />

            <label>Stall: </label>
            <input 
                type="text"
                onChange={(e) => setStall(e.target.value)}
                value={stall}
            />

            <label>Food Item: </label>
            <input 
                type="text"
                onChange={(e) => setFoodItem(e.target.value)}
                value={foodItem}
            />

            <label>Price: </label>
            <input 
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />

            <label>Telegram handle: </label>
            <input 
                type="text"
                onChange={(e) => setTele(e.target.value)}
                value={tele}
            />

            <button>Submit order</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default OrderForm