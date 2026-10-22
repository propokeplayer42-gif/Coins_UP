import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ContextAutor } from "../contex/ContexAutor";

export default function About() {
  const { autor } = useContext(ContextAutor);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <Typography variant="body1">Autor: {autor}</Typography>
    </Box>
  );
}