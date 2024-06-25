import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const MenuDetails = ({ item }) => {
  const { dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  function handleSelectQuantity() {
    setShowPopup(true);
  }

  function handleAddToCart() {
    dispatch({ type: "ADD_TO_CART", payload: { item, quantity } });
    setShowPopup(false);
    toast.success("Added to cart");
  }

  function handleQuantityChange(e) {
    setQuantity(Number(e.target.value));
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-md mx-auto"
          >
            <h2 className="text-lg font-bold text-center mb-4">{item.name}</h2>
            <p className="text-lg font-semibold text-gray-800 mb-2">${item.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity:</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="primary sticky bottom-2 button"
                type="button"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <button
                className="button"
                type="button"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              </div>
          </div>
        </div>
      )}

      <div className="ml-4 mt-4">
        <div className="border-b-2 border-gray-400 py-4">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row space-x-11 items-center">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-500">${item.price.toFixed(2)}</p>
              <button className="button" onClick={handleSelectQuantity}>
                Select quantity
              </button>
            </div>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default MenuDetails;
