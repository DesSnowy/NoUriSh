import { createContext, useReducer } from "react"

export const StallsContext = createContext()

export const stallsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STALLS': 
            return {
                stalls: action.payload
            }
        default:
            return state
    }
}

export const StallsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stallsReducer, {
        stalls: null
    })

    return (
        <StallsContext.Provider value={{...state, dispatch}}>
            { children }
        </StallsContext.Provider>
    )
}