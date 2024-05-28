import { OrdersContext } from "../context/OrdersContext"
import { useContext } from "react"

export const useOrdersContext = () => {
    const context = useContext(OrderContext)

    if (!context) {
        throw Error("useOrdersContext must be used inside an OrdersContext provided")
    }

    return context
}