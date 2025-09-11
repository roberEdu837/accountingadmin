import { Button} from "@mui/material";
import React from "react";

interface Props {
  text: string;
  icon: React.ReactNode;
  loading?: boolean;
}

export default function ButtonSubmit({ loading,text }: Props) {
  return (
   <Button
  loading={loading}
  variant="outlined"
  loadingPosition="start"
  disabled={loading}
  type="submit"
  sx={{
    backgroundColor: "#09356f",
    borderColor: "#09356f",
    color: "white",
    paddingY: 1,
    borderRadius: 3,
    textTransform: "none",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "#072c5b",
      boxShadow: loading ? 2 : 4,
    },
    "&.Mui-disabled": {
      backgroundColor: "#09356f", // mismo fondo aunque esté disabled
      color: "white",             // letras blancas
      borderColor: "#09356f",     // borde azul
      opacity: 0.7,               // opcional: para diferenciarlo un poco
    },
  }}
>
  {text}
</Button>
  );
}
