const OrderDetails = ({ order }) => {
    return (
      <div className="bg-red-100 flex flex-col m-5 space-y-3 rounded-lg p-3">
        <div className="flex flex-row justify-around space-x-5">
          <p>
            <strong>Canteen: </strong>
            {order.canteen}
          </p>
          <p>
            <strong>Stall: </strong>
            {order.stall}
          </p>
          <p>
            <strong>Food item: </strong>
            {order.foodItem}
          </p>
        </div>
        <div className="flex flex-row justify-around space-x-2">
          <p>Price: {order.price}</p>
          <p>Telegram handle: {order.tele}</p>
        </div>
      </div>
    );
}

export default OrderDetails