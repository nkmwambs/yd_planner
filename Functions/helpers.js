
// import {useContext} from 'react'
// import {GlobalContext} from '../Context/GlobalContext'


export const  is_valid_object = (obj) => {
    return typeof obj == "object" && obj != null;
 };

 export const get_phrase = (phrase, language_phrases) => {
    return is_valid_object(language_phrases) ? language_phrases[phrase]: phrase;
 }