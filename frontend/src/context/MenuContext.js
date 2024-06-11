import { createContext, useReducer } from "react"

export const MenuContext = createContext()

export const menuReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MENU': 
            return {
                menu: action.payload
            }
        default:
            return state
    }
}

export const MenuContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(menuReducer, {
        menu: null
    })

    return (
        <MenuContext.Provider value={{...state, dispatch}}>
            { children }
        </MenuContext.Provider>
    )
}