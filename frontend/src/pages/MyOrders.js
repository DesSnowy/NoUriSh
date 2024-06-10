import { useOrdersContext } from "../hooks/useOrdersContext";

//components
import OrderDetails from "../components/OrderDetails";
import OrderForm from "../components/OrderForm";

const MyOrders = () => {
  const { orders, dispatch } = useOrdersContext();
  return (
    <div className="flex flex-row justify-around">
      <div className="orders">
        {orders &&
          orders.map((order) => <OrderDetails key={order._id} order={order} />)}
      </div>
      <OrderForm />
    </div>
  );
};

export default MyOrders;
