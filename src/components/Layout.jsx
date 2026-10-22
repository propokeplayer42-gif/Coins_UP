import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Route, Routes } from "react-router";
import { Home } from "./Home";
import { ContextAutor } from "../contex/ContexAutor";
import {useContext} from "react";
import About from "./About";
import { Detail } from "./detail";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import { ContextFavoritos } from "../contex/ContextFavoritos";


const drawerWidth = 240;

const menuItems = [
  { text: "Home", to: "/", icon: <HomeIcon /> },
  { text: "About", to: "/about", icon: <InfoIcon /> },
  { text: "Favoritas", to: "/favoritas", icon: <Avatar />, subheader: true },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Layout = () => {
  const theme = useTheme();
  const { favoritos } = React.useContext(ContextFavoritos);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "#2563eb",
          color: "#ffffff",
          boxShadow: "0 8px 24px rgba(37, 99, 235, 0.25)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ mr: 2 }, open && { display: "none" }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Criptomonedas
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
           <List>
     <ListItem disablePadding>
       <ListItemButton component={Link} to="/" onClick={handleDrawerClose}>
         <ListItemIcon><HomeIcon /></ListItemIcon>
         <ListItemText primary="Home" />
       </ListItemButton>
     </ListItem>
   </List>

   <Divider />

   <List subheader={<ListSubheader>Favoritas</ListSubheader>}>
     {favoritos.length === 0 && (
       <ListItem>
         <ListItemText secondary="Aún no tienes favoritas" />
       </ListItem>
     )}
     {favoritos.map((coin) => (
       <ListItem key={coin.id} disablePadding>
         <ListItemButton
           component={Link}
           to={`/detail/${coin.id}`}
           onClick={handleDrawerClose}
         >
           <ListItemIcon>
             <Avatar src={coin.image} alt={coin.name} sx={{ width: 28, height: 28 }} />
           </ListItemIcon>
           <ListItemText
             primary={coin.name}
             secondary={`$${coin.price?.toLocaleString()}`}
           />
         </ListItemButton>
       </ListItem>
     ))}
   </List>

   <Divider />

   <List>
     <ListItem disablePadding>
       <ListItemButton component={Link} to="/about" onClick={handleDrawerClose}>
         <ListItemIcon><InfoIcon /></ListItemIcon>
         <ListItemText primary="About" />
       </ListItemButton>
     </ListItem>
   </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Main>
    </Box>
  );
};
