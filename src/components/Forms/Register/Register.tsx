import {
  Box,
  CardActions,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/slices/userSlice";
import { useNavigate } from "react-router";
import ButtonSubmit from "../../utils/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import ToastNotification from "../../utils/ToastNotification";
import { validationRegister } from "../../../validation/loginSchema";
import { Icons } from "../../utils/Icons";
import { login, register } from "../../../services";
import LogoImage from "../../login/LogoImage";

const RegisterForm = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box
      sx={{
        minHeight: isMobile ? "100%" : "70vh",
        height: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {isMobile && <LogoImage />}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 50,
          fontSize: "2rem",
          fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
          letterSpacing: 1,
        }}
      >
        Registro
      </Typography>

      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          username: "",
        }}
        validationSchema={validationRegister}
        onSubmit={async (values, { setSubmitting }) => {
          const { email, password } = values;

          try {
            const { data: res } = await register(values);
            if (res) {
              // Usuario creado correctamente
              ToastNotification("Usuario creado correctamente.", "success");

              // Sesión iniciada automáticamente y redirigiendo
              ToastNotification(
                "Sesión iniciada automáticamente. Serás redirigido...",
                "success"
              );

              const { data } = await login(password, email);
              await dispatch(
                logIn(data, () => {
                  navigate(`/accounting`, {
                    replace: true,
                  });
                })
              );
            }
          } catch (error: any) {
            // Extraemos un mensaje legible
            const message =
              error?.response?.data?.message || // si viene de la API
              error?.message || // si es un Error normal
              "Ocurrió un error";

            ToastNotification(message, "error"); // cambiar a "error" en lugar de "success"
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
            <Grid size={12} sx={{ mb: 2 }}>
              <TextField
                name="username"
                label="Usuario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid size={12} sx={{ mb: 2 }}>
              <TextField
                name="name"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
                variant="outlined"
              />
            </Grid>

            <Grid size={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  name="password"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {touched.password && errors.password}
                </FormHelperText>
              </FormControl>
            </Grid>

            <CardActions
              sx={{ display: "flex", justifyContent: "center", mt: 2 }}
            >
              <ButtonSubmit text="Registrar" icon={Icons.payment} />
            </CardActions>
          </form>
        )}
      </Formik>
    </Box>
  );
};
export default RegisterForm;
