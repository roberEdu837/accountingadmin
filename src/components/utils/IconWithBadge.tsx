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
            right: 0,
            backgroundColor: "white",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {childIcon}
        </Box>
      )}
    </Box>
  );
}

export default IconWithBadge;
