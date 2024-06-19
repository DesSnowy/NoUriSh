import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const MenuDetails = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  function handleSelectQuantity() {
    setShowPopup(true);
  }

  function handleAddToCart() {
    addToCart(item, quantity); 
    setShowPopup(false);
    toast.success("Added to cart");
  }

  function handleQuantityChange(e) {
    setQuantity(Number(e.target.value));
  }

  return (
    <>
      {showPopup && (
        <div onClick={() => setShowPopup(false)}
          className='fixed inset-0 bg-black/80 flex items-center justify-center'>
          <div onClick={ev => ev.stopPropagation()}
            className='bg-white p-4 rounded-lg overflow-scroll'>
            <h2 className='text-lg font-bold text-center'>{item.food_name}</h2>
            <p>{item.price}</p>
            <p className='itemDesc'>{item.description}</p>
            <div>
              <label htmlFor="quantity">Quantity: </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                className="quantityInput"
              />
            </div>
            <button className='primary sticky bottom-2 button' type='button' onClick={handleAddToCart}>
              Add to cart
            </button>
            <button className='button' type='button' onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="h-screen flex items-center bg-cover bg-center bg-no-repeat">
        <div className="flex flex-row justify-around space-x-5">
          <h3>{item.food_name}</h3>
          <p>{item.price}</p>
          <p className='itemDesc'>{item.description}</p>
          <button className="button" type='button' onClick={handleSelectQuantity}>
            Select quantity
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuDetails;
