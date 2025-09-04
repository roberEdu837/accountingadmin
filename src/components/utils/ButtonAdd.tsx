import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";interface Props {
  text: string;
  handleClickOpen: () => void;
}

export default function ButtonAdd({  handleClickOpen }: Props) {
  return (
    

<Tooltip title="Agregar cliente">
  <IconButton
    onClick={handleClickOpen}
    sx={{
      backgroundColor: "#09356f",
      color: "white",
      borderRadius: "50%",
      boxShadow: 2,
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#072c5b",
        boxShadow: 4,
      },
    }}
  >
    <AddIcon />
  </IconButton>
</Tooltip>

  );
}
