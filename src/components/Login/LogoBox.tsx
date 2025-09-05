import { Box } from "@mui/material";
import Logo from "../../../public/Logo.png";

export default function LogoBox() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "left",
        height: "100%",
        backgroundColor: "#09356f",
      }}
    >
      <img
        style={{ width: "200px" }}
        src={Logo}
        alt="Mi Logo"
        className="logo"
      />
    </Box>
  );
}
