import {createContext, useState} from "react";
import React from "react";

export const  ContextAutor = createContext();

export const  AutorProvider = ({children}) => {
    const [autor, setAutor] = useState("Podre");
    return (
        <ContextAutor.Provider value={{autor, setAutor}}>
            {children}
        </ContextAutor.Provider>
    );
}

