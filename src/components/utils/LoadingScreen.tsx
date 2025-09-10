import { Box } from "@mui/material";
import { HRContable_Blue } from "../../assets/images";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        alignItems: "left",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <img
        src={HRContable_Blue}
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
