import { Box, Card, Grid, useMediaQuery, useTheme } from "@mui/material";
import LogoBox from "../../components/login/LogoBox";
import RegisterForm from "../../components/Forms/Register/Register";

export default function Register() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  

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
