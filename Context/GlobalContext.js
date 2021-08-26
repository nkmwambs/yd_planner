import React, { createContext, useReducer, useState } from 'react'
import Theme from '../Constants/Theme'
import AppReducer from './AppReducer'

const initialState = {
    theme: 'light_theme'
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {

    //const [state, dispatch] = useReducer(AppReducer, initialState);
    const [theme, setTheme] = useState(initialState.theme)

    const changeTheme = (theme) => {
        // dispatch(
        //     {
        //         type:'CHANGE_THEME',
        //         payload: theme
        //     }
        // )
        setTheme(theme)
    }

    return (
        <GlobalContext.Provider
            value={
                {
                    theme: Theme[theme],
                    theme_name: theme,
                    changeTheme
                } 
            }
        >
            {children}
        </GlobalContext.Provider>
    )
}