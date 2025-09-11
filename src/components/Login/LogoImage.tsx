import { Box } from "@mui/material";
import { HRContable_Blue } from "../../assets/images";

export default function LogoImage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={HRContable_Blue} alt="Mi Logo" width={200} className="logo" />
    </Box>
  );
}
