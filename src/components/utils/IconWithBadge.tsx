import { Box } from "@mui/material";

interface Props {
  parentIcon: React.ReactNode;
  childIcon: React.ReactNode;
}
function IconWithBadge({ parentIcon, childIcon }: Props) {
  return (
    <Box position="relative" display="inline-flex">
      {parentIcon}

      {childIcon && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
          }}
        >
          {childIcon}
        </Box>
      )}
    </Box>
  );
}

export default IconWithBadge;
