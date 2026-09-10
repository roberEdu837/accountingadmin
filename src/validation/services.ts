import * as Yup from "yup";

export const validationSchemaServices = Yup.object({
    name: Yup.string().required("El nombre del servicio adicional es requerido").min(3, "Debe tener al menos 3 caracteres"),
})

export const validationSchemaAddServiceAccounting = Yup.object({
    servicesId: Yup.number().required("El servicio adicional es requerido"),
    amount: Yup.number().required("El monto es requerido").min(1, "El monto debe ser mayor a 0"),
})