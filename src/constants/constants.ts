export const PRIORITY: Record<string, number> = {
  PENDIENTE: 0,
  INCONCLUSO: 1,
  REALIZADO: 2,
};

export const OPTIONS = ["PENDIENTE", "INCONCLUSO", "REALIZADO"];
export const COLORS: Record<string, "error" | "warning" | "success"> = {
  PENDIENTE: "error",
  INCONCLUSO: "warning",
  REALIZADO: "success",
};
