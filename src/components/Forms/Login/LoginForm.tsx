import {
  Box,
  CardActions,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { login } from "../../../services/user.service";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router";
import { validationSchema } from "../../../validation";
import Logo from "../../Login/Logo";
import ButtonSubmit from "../../utils/Button";

const LoginForm = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  return (
    <Box
      sx={{
        height: isMobile ? "100%": "70vh",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {
        isMobile && <Logo/>
      }
      <Typography variant="h4" sx={{ fontSize: "xx-large", fontWeight: 300 }}>
        Inicio de Sesión
      </Typography>

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { email, password } = values;

          try {
            const { data } = await login(password, email);
            await dispatch(
              logIn(data, () => {
                navigate(`/accounting`, {
                  replace: true,
                });
              })
            );
          } catch (error) {
            console.error("Error al iniciar sesión");
          }
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleBlur,
          handleChange,
          values,
          errors,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 2 }}></Grid>
            <Grid size={12} sx={{ mb: 2 }}>
              <TextField
                type="email"
                name="email"
                label="Correo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="password"
                name="password"
                label="Contraseña"
                fullWidth
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>

            <CardActions
              sx={{ display: "flex", justifyContent: "center", mt: 2 }}
            >
              <ButtonSubmit text="Iniciar Sesión"/>
            </CardActions>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default LoginForm;
