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
import { Link, useNavigate } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "./Logout";
import { HRContable_White } from "../../assets/images";
import { NavItems } from "../utils/NavItems";

const drawerWidth = 240;

function Menu(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen((prevState) => !prevState);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "#09356f", height: "100vh" }}
    >
      <Box sx={{ flexGrow: 1, backgroundColor: "#09356f" }}>
        <img
          style={{ width: "100px" }}
          src={HRContable_White}
          alt="Mi Logo"
          className="logo"
          onClick={() => navigate("/accounting")}
        />
      </Box>
      <Divider />
      <List sx={{ width: "100%", backgroundColor: "#09356f" }}>
        {NavItems.map((item) => (
          <>
            <ListItem
              key={item.label}
              style={{
                width: "100%",
                backgroundColor: "#09356f",
              }}
            >
              {item.icon}
              <Link to={item.path} className="link">
                {item.label}
              </Link>
            </ListItem>
            <Divider />
          </>
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
          <IconButton style={{ color: "white" }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <img
              style={{ width: "100px" }}
              src={HRContable_White}
              alt="Mi Logo"
              className="logo"
              onClick={() => navigate("/accounting")}
            />
          </Box>

          <Logout />
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
