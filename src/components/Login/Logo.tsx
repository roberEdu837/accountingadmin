import { Box } from "@mui/material";
import logoImg from "../../../public/Logo2.png";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={logoImg} alt="Mi Logo" width={200} className="logo" />
    </Box>
  );
}
