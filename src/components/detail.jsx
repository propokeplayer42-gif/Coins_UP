import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = new URL(
      `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
    );
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
        if (!data?.market_data) {
          throw new Error("Unexpected response while fetching coin");
        }
        setCoin(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching coin:", err);
        setError("No se pudo cargar la moneda.");
        setLoading(false);
      });
  }, [id]);

  const backButton = (
    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
      Volver
    </Button>
  );

  if (loading) {
    return (
      <Box>
        {backButton}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        {backButton}
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  const market = coin.market_data;
  const change = market.price_change_percentage_24h;
  const description = (coin.description?.en || "")
    .replace(/<[^>]*>/g, "")
    .trim();

  return (
    <Box>
      {backButton}

      <Paper sx={{ p: 3, mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar src={coin.image?.large} alt={coin.name} sx={{ width: 64, height: 64 }} />
          <Box>
            <Typography variant="h4">{coin.name}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {coin.symbol?.toUpperCase()}
            </Typography>
          </Box>
          {coin.market_cap_rank && (
            <Chip label={`Rank #${coin.market_cap_rank}`} sx={{ ml: "auto" }} />
          )}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 2,
            mb: 3,
          }}
        >
          <Stat label="Precio" value={`$${market.current_price?.usd?.toLocaleString()}`} />
          <Stat
            label="Cambio 24h"
            value={`${change?.toFixed(2)}%`}
            color={change >= 0 ? "success.main" : "error.main"}
          />
          <Stat label="Máximo 24h" value={`$${market.high_24h?.usd?.toLocaleString()}`} />
          <Stat label="Mínimo 24h" value={`$${market.low_24h?.usd?.toLocaleString()}`} />
          <Stat label="Market cap" value={`$${market.market_cap?.usd?.toLocaleString()}`} />
        </Box>

        {description && (
          <>
            <Typography variant="h6" gutterBottom>
              Descripción
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.length > 600
                ? `${description.slice(0, 600)}...`
                : description}
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

const Stat = ({ label, value, color }) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="h6" color={color}>
      {value}
    </Typography>
  </Box>
);