import React, { createContext, useReducer } from 'react'
import Theme from '../Constants/Theme'
import AppReducer from './AppReducer'

const initialState = {
    theme: 'primary'
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <GlobalContext.Provider
            value={
                {
                    theme: Theme[state.theme]
                } 
            }
        >
            {children}
        </GlobalContext.Provider>
    )
}