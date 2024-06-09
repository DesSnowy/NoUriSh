return (
    <div className="flex flex-row justify-around">
        <div className="orders">
            {orders &&
            orders.map((order) => (
                <OrderDetails key={order._id} order={order} />
            ))}
        </div>
        <OrderForm />
    </div>
)
