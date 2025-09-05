import * as React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { Avatar, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function MenuListComposition() {
  const { user } = useSelector((state: any) => state.user);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    try {
      dispatch(
        logOut(() => {
          navigate(`/`, { replace: true });
        })
      );
    } catch (error) {}
    setOpen(false);
  };

  const handleCloseAway = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar
            alt={user.email}
            src="logo"
            sx={{ bgcolor: "#fff", color: "#09356f", fontSize: "1.1em" }}
          />
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  borderRadius: 2,
                  boxShadow: 5,
                  p: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#09356f",
                    width: 56,
                    height: 56,
                    fontSize: 24,
                  }}
                  alt={user.email}
                  src="use.email"
                ></Avatar>

                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    fontSize: 16,
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    fontSize: 16,
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {user.email}
                </Typography>

                <ClickAwayListener onClickAway={handleCloseAway}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      onClick={handleClose}
                      className="menuItem"
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        backgroundColor: "#09356f",
                        borderRadius: 1,
                        ":hover": {
                          color: "#09356f",
                        },
                      }}
                    >
                      Cerrar Sesión
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
