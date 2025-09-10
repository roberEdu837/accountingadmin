import { useState } from "react";
import { Chip, Menu, MenuItem } from "@mui/material";
import { patchAccounting } from "../../services";

const opciones = ["PENDIENTE", "INCONCLUSO", "REALIZADO"];
const colores: Record<string, "error" | "warning" | "success"> = {
  PENDIENTE: "error",
  INCONCLUSO: "warning",
  REALIZADO: "success",
};

export default function ChipCiclico({
  valorInicial,
  id,
  setFlag,
  flag
}: {
  valorInicial: string;
  id: number;
  setFlag?: (value: boolean) => void;
  flag: boolean
}) {
  const [valor, setValor] = useState(valorInicial);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (nuevoValor?: string) => {
    setAnchorEl(null);
    if (nuevoValor && nuevoValor !== valor) {
      try {
        await patchAccounting(id, { stateObligation: nuevoValor });
        setValor(nuevoValor);
      } catch (error) {
        console.error(error);
      } finally {
        if (setFlag) setFlag(!flag);
      }
    }
  };

  return (
    <>
      <Chip
        label={valor}
        color={colores[valor]}
        variant="outlined"
        size="small"
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          minWidth: 80,
          height: 32,
          fontSize: "0.75rem",
          borderRadius: "16px",
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {opciones.map((op) => (
          <MenuItem key={op} onClick={() => handleClose(op)}>
            {op}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
