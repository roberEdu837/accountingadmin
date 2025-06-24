import { Button } from "@mui/material";
interface Props{
    text: string
}

export default function ButtonSubmit({text}: Props) {
  return (
    <Button
      type="submit"
      variant="outlined"
      sx={{
        backgroundColor: "#09356f",
        color: "white",
        fontWeight: "300",
        paddingX: 3,
        paddingY: 1,
        borderRadius: 2,
        textTransform: "none",
        fontSize: "1rem",
        boxShadow: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "#072c5b",
          boxShadow: 4,
        },
      }}
    >
      {text}
    </Button>
  );
}
