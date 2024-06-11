import { StallsContext } from "../context/StallsContext"
import { useContext } from "react"

export const useStallsContext = () => {
    const context = useContext(StallsContext);
    if (!context) {
        throw Error("useStallsContext must be used inside a StallsContext provided")
    }

    return context
}