import { Box } from "@mui/material";
import { HRContable_White } from "../../assets/images";


export default function LogoBox() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#09356f",
      }}
    >
      <img
        style={{ width: "200px" }}
        src={HRContable_White}
        alt="Mi Logo"
        className="logo"
      />
    </Box>
  );
}
