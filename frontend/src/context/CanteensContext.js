import { createContext, useReducer } from "react"

export const CanteensContext = createContext()

export const canteensReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CANTEENS': 
            return {
                canteens: action.payload
            }
        default:
            return state
    }
}

export const CanteensContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(canteensReducer, {
        canteens: null
    })

    return (
        <CanteensContext.Provider value={{...state, dispatch}}>
            { children }
        </CanteensContext.Provider>
    )
}