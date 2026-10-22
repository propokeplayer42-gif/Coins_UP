import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { AutorProvider } from "./contex/AutorProvider";
import { FavoritosProvider } from "./contex/FavoritosProvider"; // <-- NUEVO

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AutorProvider>
      <FavoritosProvider>
        <Layout />
      </FavoritosProvider>
    </AutorProvider>
  </BrowserRouter>
);
