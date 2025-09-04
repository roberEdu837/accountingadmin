import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string().required("El correo es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "Contraseña demasiado corta"),
});

export const validationRegister = Yup.object().shape({
  email: Yup.string()
    .email("El correo no es válido")
    .required("El correo es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "Contraseña demasiado corta"),
  username: Yup.string()
    .required("El nombre de usuario es requerido")
    .matches(/^\S*$/, "El nombre de usuario no puede contener espacios"),
  name: Yup.string().required("El nombre es requerido"),
});
