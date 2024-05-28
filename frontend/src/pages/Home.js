import { useEffect } from 'react'
import { useOrdersContext } from '../hooks/useOrdersContext'

//components
import OrderDetails from '../components/OrderDetails'
import OrderForm from '../components/OrderForm'

const Home = () => {
    const {orders, dispatch} = useOrdersContext()

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/orders')
            const json = await response.json() //array of order objects

            if (response.ok) {
                dispatch({type: 'SET_ORDER', payload: json})
            }
        }

        fetchOrders()
    }, [])

    return (
        <div className="home">
            <div className="orders">
                {orders && orders.map((order) => (
                    <OrderDetails key={order._id} order={order}/>
                ))}
            </div>
            <OrderForm />
        </div>
    )
}

export default Home