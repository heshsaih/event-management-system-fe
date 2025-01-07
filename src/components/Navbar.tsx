import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import StyledLink from "./StyledLink";
import { Colors } from "../constants/styling";
import useAccountStore from "../data/useAccountStore";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const open = !!anchorEl;
  const navigate = useNavigate();

  const state = useAccountStore(function(state) {
    return state;
  });

  const handleOpen = function(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = function() {
    setAnchorEl(undefined);
  };

  const isAuthenticated = !!state.token;

  return (
    <Box sx={{}}>
      <CssBaseline></CssBaseline>
      <AppBar
        sx={{
          borderBottom: `3px solid ${Colors.RED}`,
          boxShadow: "0 5px 10px rgba(0, 0, 0, .15)",
          backgroundColor: "primary",
        }}
        color="inherit"
      >
        <Toolbar
          sx={{
            height: "4.5rem",
          }}
        >
          <Box>
            <StyledLink
              to={"/"}
              style={{
                color: Colors.RED,
                textDecoration: "none",
              }}
              variant="h6"
            >
              Wydarzenia PŁ
            </StyledLink>
          </Box>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <Divider
            sx={{ height: "75%", marginX: "1rem" }}
            orientation="vertical"
          ></Divider>
          {!isAuthenticated ? (
            <StyledLink
              to={"/login"}
              style={{
                color: Colors.RED,
              }}
            >
              Zaloguj się
            </StyledLink>
          ) : (
            <>
              <Tooltip onClick={handleOpen} title="Konto" color="main.primary">
                <IconButton
                  sx={{
                    borderRadius: "0.5rem",
                    color: Colors.RED,
                  }}
                >
                  <PersonIcon></PersonIcon>
                  <Typography>{`${state.parsedToken?.given_name} ${state.parsedToken?.family_name}`}</Typography>
                </IconButton>
              </Tooltip>
              <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
                <MenuItem
                  onClick={function() {
                    navigate("/my-profile");
                    handleClose();
                  }}
                >
                  <Typography>Mój profil</Typography>
                </MenuItem>
                <MenuItem
                  onClick={function() {
                    navigate("/logout");
                    handleClose();
                  }}
                >
                  <Typography>Wyloguj się</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
