import react from "react";

import {useState} from "react";
import { ContextAutor } from "./ContexAutor";

export const AutorProvider = ({ children }) => {
  const [autor, setAutor] = useState("Podre");
  return (
    <ContextAutor.Provider value={{ autor, setAutor }}>
      {children}
    </ContextAutor.Provider>
  );
};