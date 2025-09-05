import * as Yup from "yup";

export const validationSchemaPassword = Yup.object({
  systemName: Yup.string().required("El nombre del sistema es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
  accessKey: Yup.string().required("La clave de acceso es requerida o usuario"),
});
