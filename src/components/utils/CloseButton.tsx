import { IconButton } from "@mui/material";
import { Icons } from "./Icons";
interface Props {
  onClose: () => void;
}

export default function CloseButton({ onClose }: Props) {
  return (
    <IconButton
      aria-label="cerrar"
      onClick={onClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      {Icons.closeIcon}
    </IconButton>
  );
}
