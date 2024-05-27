import { useEffect, useState } from 'react'

//components
import OrderDetails from '../components/OrderDetails'

const Home = () => {
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/api/orders')
            const json = await response.json() //array of order objects

            if (response.ok) {
                setOrders(json)
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
        </div>
    )
}

export default Home