import { Box } from "@mui/material";

interface Props {
  title: string;
  subtitle: string;
}

export default function DialogMessageBox({ title, subtitle }: Props) {
  return (
    <Box sx={{ px: 3, pt: 2 }}>
      <h2
        style={{
          margin: 0,
          fontSize: "1.25rem",
          color: "#09356f",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: "0.875rem",
          color: "#666",
        }}
      >
        {subtitle}
      </p>
      
    </Box>
  );
}
