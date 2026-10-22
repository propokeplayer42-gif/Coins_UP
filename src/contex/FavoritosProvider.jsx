import React, { useState } from "react";
import { ContextFavoritos } from "./ContextFavoritos";

export const FavoritosProvider = ({ children }) => {

  const [favoritos, setFavoritos] = useState([]);


  const esFavorito = (id) => favoritos.some((f) => f.id === id);

  const toggleFavorito = (coin) => {
    setFavoritos((prev) =>
      prev.some((f) => f.id === coin.id)
        ? prev.filter((f) => f.id !== coin.id)
        : [
            ...prev,
            {
              id: coin.id,
              name: coin.name,
              image: coin.image,
              price: coin.current_price,
            },
          ]
    );
  };

  return (
    <ContextFavoritos.Provider value={{ favoritos, esFavorito, toggleFavorito }}>
      {children}
    </ContextFavoritos.Provider>
  );
};