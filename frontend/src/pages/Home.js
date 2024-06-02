import { useEffect } from 'react'
import { useOrdersContext } from '../hooks/useOrdersContext'
import { useAuthContext } from '../hooks/useAuthContext'

//components
import OrderDetails from '../components/OrderDetails'
import OrderForm from '../components/OrderForm'

const Home = () => {
    const {orders, dispatch} = useOrdersContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(
              "https://backend-navy-omega-16.vercel.app/api/orders/",
              {
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              }
            );
            const json = await response.json() //array of order objects

            if (response.ok) {
                dispatch({type: 'SET_ORDER', payload: json})
            }
        }

        if (user) {
            fetchOrders()
        }
        
    }, [dispatch, user])

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
    );
}

export default Home