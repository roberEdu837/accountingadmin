import { Chip } from "@mui/material";
import { patchAccounting } from "../../services/accounting.service";

const opciones = ["PENDIENTE", "REALIZADO", "INCONCLUSO"];
type Estado = (typeof opciones)[number];
const colores: Record<Estado, "error" | "success" | "warning"> = {
  PENDIENTE: "error",
  REALIZADO: "success",
  INCONCLUSO: "warning",
};

export default function ChipCiclico({
  valorInicial,
  setLoading,
  loading,
  id
}: //onChange,
{
  valorInicial: string;
  setLoading?: (value: boolean) => void;
  loading: boolean;
  id: number;
}) {

  const editEstado = async () => {
    try {
      const indexActual = opciones.indexOf(valorInicial as Estado);
      const siguiente = opciones[(indexActual + 1) % opciones.length];
      const { data } = await patchAccounting(id, {
        stateObligation: siguiente,
      });

      if (setLoading) {
        setLoading(!loading);
      }

      console.log("Estado actualizado:", data);
    } catch (error) {}
  };

  return (
    <Chip
      label={valorInicial}
      color={colores[valorInicial] || "default"}
      variant="outlined"
      onClick={editEstado}
      sx={{ cursor: "pointer" }}
    />
  );
}
