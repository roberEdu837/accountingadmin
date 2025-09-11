import { IconButton, Tooltip } from "@mui/material";
interface Props {
  text: string;
  handleClickOpen: () => void;
  icon: React.ReactNode;
  disabled?: boolean;
  loading?: boolean
}

export default function ButtonAdd({
  handleClickOpen,
  text,
  icon,
  disabled,
  loading
}: Props) {
  return (
    <Tooltip title={text}>
      <IconButton
        loading={loading}
        disabled={disabled}
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
        {icon}
      </IconButton>
    </Tooltip>
  );
}
