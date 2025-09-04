// import { Chip } from "@mui/material";
// import { patchAccounting } from "../../services/accounting.service";

// const opciones = ["PENDIENTE", "INCONCLUSO", "REALIZADO"];
// type Estado = (typeof opciones)[number];
// const colores: Record<Estado, "error" | "warning" | "success"> = {
//   PENDIENTE: "error",
//   INCONCLUSO: "warning",
//   REALIZADO: "success",
// };

// export default function ChipCiclico({
//   valorInicial,
//   setLoading,
//   loading,
//   id
// }: //onChange,
// {
//   valorInicial: string;
//   setLoading?: (value: boolean) => void;
//   loading: boolean;
//   id: number;
// }) {

//   const editEstado = async () => {
//     try {
//       const indexActual = opciones.indexOf(valorInicial as Estado);
//       const siguiente = opciones[(indexActual + 1) % opciones.length];
//       const { data } = await patchAccounting(id, {
//         stateObligation: siguiente,
//       });

//       if (setLoading) {
//         setLoading(!loading);
//       }

//       console.log("Estado actualizado:", data);
//     } catch (error) {}
//   };

//   return (
//     <Chip
//       label={valorInicial}
//       color={colores[valorInicial] || "default"}
//       variant="outlined"
//       onClick={editEstado}
//       sx={{ cursor: "pointer" }}
//     />
//   );
// }
import { useState } from "react";
import { Chip, Select, MenuItem } from "@mui/material";
import { patchAccounting } from "../../services/accounting.service";

const opciones = ["PENDIENTE", "INCONCLUSO", "REALIZADO"];
type Estado = (typeof opciones)[number];
const colores: Record<Estado, "error" | "warning" | "success"> = {
  PENDIENTE: "error",
  INCONCLUSO: "warning",
  REALIZADO: "success",
};

export default function ChipCiclico({
  valorInicial,
  setLoading,
  loading,
  id,
}: {
  valorInicial: string;
  setLoading?: (value: boolean) => void;
  loading: boolean;
  id: number;
}) {
  const [modoSelect, setModoSelect] = useState(false);
  const [valor, setValor] = useState<Estado>(valorInicial as Estado);

  const guardarEstado = async (nuevoValor: Estado) => {
    try {
      const { data } = await patchAccounting(id, {
        stateObligation: nuevoValor,
      });

      setValor(nuevoValor);

      if (setLoading) {
        setLoading(!loading);
      }

      console.log("Estado actualizado:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return modoSelect ? (
    <Select
      size="small"
      value={valor}
      onChange={(e) => {
        const nuevo = e.target.value as Estado;
        guardarEstado(nuevo);
        setModoSelect(false);
      }}
      onBlur={() => setModoSelect(false)}
      autoFocus
      variant="outlined"
      sx={{
        maxWidth: 110,
        borderRadius: "16px", // redondeado como el chip
        height: 32, // altura similar al chip
        "& .MuiSelect-select": {
          padding: "4px 12px", // padding más ajustado
        },
        "& fieldset": {
          borderColor:
            valor === "PENDIENTE"
              ? "#d32f2f"
              : valor === "INCONCLUSO"
              ? "#ed6c02"
              : "#4CAF50",
        },
        color:
          valor === "PENDIENTE"
            ? "#d32f2f"
            : valor === "INCONCLUSO"
            ? "#ed6c02"
            : "#2e7d32",
      }}
    >
      {opciones.map((op) => (
        <MenuItem key={op} value={op}>
          {op}
        </MenuItem>
      ))}
    </Select>
  ) : (
    <Chip
      label={valor}
      color={colores[valor]}
      variant="outlined"
      onClick={() => setModoSelect(true)}
      sx={{ cursor: "pointer" }}
    />
  );
}
