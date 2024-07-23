import React, { useState } from 'react'
import AddCanteenForm from "../components/AddCanteenForm"
import AddStallForm from "../components/AddStallForm"
import AddFoodForm from "../components/AddFoodForm.js";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {showCanteenPopup && (
        <div
          onClick={() => setShowCanteenPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-md mx-auto"
          >
            <div className="flex flex-col items-center">
              <AddCanteenForm onClose={() => setShowCanteenPopup(false)} />
            </div>
          </div>
        </div>
      )}

      {showStallPopup && (
        <div
          onClick={() => setShowStallPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-md mx-auto"
          >
            <div className="flex flex-col items-center">
              <AddStallForm onClose={() => setShowStallPopup(false)} />
            </div>
          </div>
        </div>
      )}

      {showFoodPopup && (
        <div
          onClick={() => setShowFoodPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-w-md mx-auto"
          >
            <div className="flex flex-col items-center">
              <AddFoodForm onClose={() => setShowFoodPopup(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <button className="button" onClick={handleAddCanteen}>
          Add Canteen
        </button>
        <button className="button" onClick={handleAddStall}>
          Add Stall
        </button>
        <button className="button" onClick={handleAddFood}>
          Add Food
        </button>
      </div>
    </div>
  )
}

export default Admin;
