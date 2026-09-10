import { useState, type MouseEvent } from "react";
import { Chip, Menu, MenuItem } from "@mui/material";
import { patchAccounting } from "../../services";
import { COLORS, OPTIONS } from "../../constants/constants";
import type { StatusSelectorProps } from "../types/accounting.types";

export default function StatusSelector({
  valorInicial,
  id,
  setFlag,
  flag
}: StatusSelectorProps) {
  const [valor, setValor] = useState(valorInicial);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
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
        color={COLORS[valor]}
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
        {OPTIONS.map((op) => (
          <MenuItem key={op} onClick={() => handleClose(op)}>
            {op}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
