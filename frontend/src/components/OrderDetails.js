const OrderDetails = ({ order }) => {
    return (
        <div className="order-details">
            <p><strong>Canteen: </strong>{order.canteen}</p>
            <p><strong>Stall: </strong>{order.stall}</p>
            <p><strong>Food item: </strong>{order.foodItem}</p>
            <p>Price: {order.price}</p>
            <p>Telegram handle: {order.tele}</p>
        </div>
    )
}

export default OrderDetails