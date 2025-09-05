type Column = {
  label: string;
  align?: "center" | "left" | "right" | "inherit" | "justify";
};

export const columns: Column[]  = [
  { label: "Razón Social", align: "left" },
  { label: "Periodicidad", align: "center" },
  { label: "Mes", align: "center" },
  { label: "Obligaciones", align: "center" },
  { label: "F. Cumplimiento", align: "center" },
  { label: "Monto", align: "center" },
  { label: "Abonado", align: "center" },
  { label: "Adeudo", align: "center" },
  { label: "En sociedad", align: "center" },
  { label: "Opciones", align: "center" },
];