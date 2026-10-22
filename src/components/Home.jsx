import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { ContextFavoritos } from "../contex/ContextFavoritos";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { esFavorito, toggleFavorito } = useContext(ContextFavoritos);

  useEffect(() => {
    const url = new URL(API_URL);
    if (API_KEY) {
      url.searchParams.set("x_cg_demo_api_key", API_KEY);
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response while fetching coins");
        }
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching coins:", err);
        setError("No se pudieron cargar las criptomonedas.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 2,
        }}
      >
        {coins.map((coin) => (
          <Card key={coin.id}>
            <CardActionArea onClick={() => navigate(`/detail/${coin.id}`)}>
              <CardContent
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Avatar src={coin.image} alt={coin.name} />
                <Box>
                  <Typography variant="subtitle1">{coin.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {coin.symbol?.toUpperCase()}
                    {coin.current_price !== undefined &&
                      ` · $${coin.current_price.toLocaleString()}`}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
              <CardActions>
                <Button size="small" onClick={() => toggleFavorito(coin)}>
                  {esFavorito(coin.id) ? "Quitar de favoritas" : "Agregar a favoritas"}
                </Button>
              </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
