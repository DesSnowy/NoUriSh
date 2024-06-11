import { CanteensContext } from "../context/CanteensContext"
import { useContext } from "react"

export const useCanteensContext = () => {
    const context = useContext(CanteensContext);
    if (!context) {
        throw Error("useCanteensContext must be used inside a CanteensContext provided")
    }

    return context
}