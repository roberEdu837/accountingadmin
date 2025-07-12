import { Box } from "@mui/material";
import Logo from "../../../public/Logo2.png";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={Logo}
        alt="Logo"
        style={{
          width: "100px",
          height: "100px",
          animation: "spin 2s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
}
