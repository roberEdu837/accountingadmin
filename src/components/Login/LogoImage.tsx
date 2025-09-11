import { Box } from "@mui/material";
import { HRContable_White } from "../../assets/images";

export default function LogoImage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={HRContable_White} alt="Mi Logo" width={200} className="logo" />
    </Box>
  );
}
