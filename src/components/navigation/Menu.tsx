import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../public/Logo.png"; // Adjust the path as necessary
import Logout from "./Logout";

const drawerWidth = 240;
const navItems = [
  {
    label: "Contabilidad",
    path: "/accounting",
  },
  {
    label: "Clientes",
    path: "/customers",
  },
  {
    label: "Clientes en Sociedad",
    path: "/clientsSociety",
  },
];

function Menu(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ flexGrow: 1, backgroundColor: "#09356f" }}>
        <img
          style={{ width: "100px" }}
          src={Logo}
          alt="Mi Logo"
          className="logo"
        />
      </Box>

      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            style={{
              padding: "10px 20px",
              margin: "5px 0",
              borderRadius: "12px",
              backgroundColor: "#f5f5f5",
              transition: "background-color 0.3s, transform 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e0e0e0";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f5f5f5";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Link
              to={item.path}
              style={{
                textDecoration: "none",
                color: "#333",
                fontWeight: "500",
                fontSize: "1rem",
                width: "100%",
                display: "block",
              }}
            >
              {item.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{ backgroundColor: "#09356f", color: "black" }}
        component="nav"
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img
              style={{ width: "100px" }}
              src={Logo}
              alt="Mi Logo"
              className="logo"
            />
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            style={{ color: "white" }}
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
         
          <Logout/>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Menu;
