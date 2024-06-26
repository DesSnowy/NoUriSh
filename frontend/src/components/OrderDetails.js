import React from 'react';

const OrderDetails = ({ order }) => {
  return (
    <div key={order.id} className="ml-10 w-96 flex flex-col items-start gap-4 mb-4 p-4 border border-gray-300 bg-white rounded-lg shadow-lg">
      <h3 className="font-semibold text-lg text-blue-400">Order ID: {order.id}</h3>
      <div className="text-gray-700">
        <p className="mb-1"><span className="font-medium">Canteen:</span> {order.canteen}</p>
        <p className="mb-1"><span className="font-medium">Stall:</span> {order.stall}</p>
        <p className="mb-1"><span className="font-medium">Food Item:</span> {order.foodItem}</p>
        <p className="mb-1"><span className="font-medium">Quantity:</span> {order.quantity}</p>
        <p className="mb-1"><span className="font-medium">Price:</span> ${(order.price*order.quantity).toFixed(2)}</p>
        <p className="mb-1"><span className="font-medium">Group:</span> {order.group}</p>
        <p className="mb-1"><span className="font-medium">Ordered at:</span> {new Date(order.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
