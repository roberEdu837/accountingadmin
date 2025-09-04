import * as Yup from "yup";

// Expresiones regulares RFCs
const RFC_MORAL = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;
const RFC_FISICA = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;

export const validationSchemaClient = Yup.object({
  socialReason: Yup.string()
    .required("La razón social es requerida")
    .min(3, "Debe tener al menos 3 caracteres"),

  rfc: Yup.string()
    .required("El RFC es requerido")
    .test("is-valid-rfc", "El RFC no es válido", (value) => {
      if (!value) return false;
      const upperValue = value.toUpperCase().trim();
      return RFC_MORAL.test(upperValue) || RFC_FISICA.test(upperValue);
    }),

  password: Yup.string()
    .required("La contraseña es requerida")
    .min(4, "Debe tener al menos 4 caracteres"),

  honorary: Yup.number()
    .typeError("Debe ser un número")
    .required("El monto de honorarios es requerido")
    .min(0, "No puede ser negativo"),

  periodicity: Yup.string()
    .required("La periodicidad es requerida")
    .oneOf(["MENSUAL", "BIMESTRAL"], "Debe ser MENSUAL o BIMESTRAL"),

  creationDate: Yup.date()
    .required("La fecha de creación es requerida")
    .typeError("Fecha inválida"),

  renewalDate: Yup.date()
    .required("La fecha de renovación es requerida")
    .min(
      Yup.ref("creationDate"),
      "La fecha de renovación debe ser posterior a la de creación"
    )
    .typeError("Fecha inválida"),
  
});
