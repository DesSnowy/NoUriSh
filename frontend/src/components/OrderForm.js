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
      const response = await fetch("https://backend-navy-omega-16.vercel.app/api/orders/", {
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
        <form className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 w-full justify-end" onSubmit={handleSubmit}>
            <h3 className="text-center space-y-2 sm:text-left text-xl font-bold text-black">Add an Order</h3>

            <label className="userInputHeading">Canteen: </label>
            <input 
                type="text"
                onChange={(e) => setCanteen(e.target.value)}
                value={canteen}
                className="userInput"
            />

            <label className="userInputHeading">Stall: </label>
            <input 
                type="text"
                onChange={(e) => setStall(e.target.value)}
                value={stall}
                className="userInput"
            />

            <label className="userInputHeading">Food Item: </label>
            <input 
                type="text"
                onChange={(e) => setFoodItem(e.target.value)}
                value={foodItem}
                className="userInput"
            />

            <label className="userInputHeading">Price: </label>
            <input 
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="userInput"
            />

            <label className="userInputHeading">Telegram handle: </label>
            <input 
                type="text"
                onChange={(e) => setTele(e.target.value)}
                value={tele}
                className="userInput"
            />

            <button className="button">Submit order</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default OrderForm