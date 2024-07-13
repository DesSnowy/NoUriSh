import React, { useState } from 'react'
import AddCanteenForm from "../components/AddCanteenForm"
import AddStallForm from "../components/AddStallForm"
import AddFoodForm from "../components/AddFoodForm"

const Admin = () => {
  const [showCanteenPopup, setShowCanteenPopup] = useState(false);
  const [showStallPopup, setShowStallPopup] = useState(false);
  const [showFoodPopup, setShowFoodPopup] = useState(false);

  function handleAddCanteen() {
    setShowCanteenPopup(true);
  }

  function handleAddStall() {
    setShowStallPopup(true);
  }

  function handleAddFood() {
    setShowFoodPopup(true);
  }

  return (
    <>
      {showCanteenPopup && (
        <div
          onClick={() => setShowCanteenPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-md mx-auto"
          >
            <div className="flex flex-row justify-around">
              <AddCanteenForm onClose={() => setShowCanteenPopup(false)}/>
            </div>
          </div>
        </div>
      )}

      {showStallPopup && (
        <div
          onClick={() => setShowStallPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-md mx-auto"
          >
            <div className="flex flex-row justify-around">
              <AddStallForm onClose={() => setShowStallPopup(false)}/>
            </div>
          </div>
        </div>
      )}

      {showFoodPopup && (
        <div
          onClick={() => setShowFoodPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-md mx-auto"
          >
            <div className="flex flex-row justify-around">
              <AddFoodForm onClose={() => setShowFoodPopup(false)}/>
            </div>
          </div>
        </div>
      )}

      <button className="button" onClick={handleAddCanteen}>Add canteen</button>
      <button className="button" onClick={handleAddStall}>Add stall</button>
      <button className="button" onClick={handleAddFood}>Add food</button>

    </>
  )
}

export default Admin;
