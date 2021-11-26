import React, { createContext, useReducer, useState } from 'react'
import Theme from '../Constants/Theme'
import AppReducer from './AppReducer'

const initialState = {
    theme: 'light_theme',
    userId:0,
    languagePhrase: {}
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {

    //const [state, dispatch] = useReducer(AppReducer, initialState);
    const [theme, setTheme] = useState(initialState.theme)
    const [userId, setUserId] = useState(initialState.userId)
    const [languagePhrase, setLanguagePhrase] = useState(initialState.languagePhrase)

    const changeTheme = (theme) => {
        setTheme(theme)
    }

    const updateLanguagePhrases = (languagePhrase) => {
        setLanguagePhrase(languagePhrase)
    }

    const registerUserId = (id) => {
        setUserId(id)
    }

    return (
        <GlobalContext.Provider
            value={
                {
                    theme: Theme[theme],
                    theme_name: theme,
                    userId:userId,
                    changeTheme,
                    registerUserId,
                    updateLanguagePhrases
                } 
            }
        >
            {children}
        </GlobalContext.Provider>
    )
}