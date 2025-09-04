import { Box, Card, Grid, useMediaQuery, useTheme } from "@mui/material";
import LogoBox from "../../components/Login/LogoBox";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RegisterForm from "../../components/Forms/Register/LoginForm";

export default function Register() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const { isAuthenticated } = useSelector((state: any) => state.user);

  if (isAuthenticated) {
    return <Navigate to="/accounting" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        p: 2,
      }}
    >
      <Card
        sx={{ minWidth: isMobile ? "100%" : 600, borderRadius: "20px" }}
        elevation={5}
        
      >
        <Grid container spacing={0}>
          <Grid
            size={isMobile ? 12 : 6}
            sx={{ display: isMobile ? "none" : "block" }}
          >
            <LogoBox />
          </Grid>
          <Grid size={isMobile ? 12 : 6}>
            <RegisterForm />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
