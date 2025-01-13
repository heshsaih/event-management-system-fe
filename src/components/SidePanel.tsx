import {
  Box,
  Container,
  Drawer,
  Fab,
  Grid2,
  Grid2Props,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../constants/styling";
import StyledLink from "./StyledLink";
import { useNavigate } from "react-router-dom";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { Person } from "@mui/icons-material";
import useAccountStore, { Role } from "../data/useAccountStore";

const breakpoints: Grid2Props["size"] = {
  xs: 12,
  sm: 12,
  md: 4,
  lg: 4,
  xl: 4,
};

type LinkType = {
  name: string;
  uri: string;
};

const publicLinks = function(t: TFunction): LinkType[] {
  return [
    {
      name: t("sidePanel.publicLinks.login"),
      uri: "/login",
    },
    {
      name: t("sidePanel.publicLinks.events"),
      uri: "/events",
    },
  ];
};

const authenticatedLinks = function(t: TFunction): LinkType[] {
  return [
    {
      name: t("sidePanel.authenticatedLinks.events"),
      uri: "/events",
    },
    {
      name: t("sidePanel.authenticatedLinks.myProfile"),
      uri: "/my-profile",
    },
  ];
};

const managerLinks = function(t: TFunction): LinkType[] {
  return [
    {
      name: t("sidePanel.managerLinks.events"),
      uri: "/manager/events",
    },
    {
      name: t("sidePanel.managerLinks.createEvent"),
      uri: "/manager/events/create?step=0",
    },
    {
      name: t("sidePanel.managerLinks.speakers"),
      uri: "/manager/speakers",
    },
    {
      name: t("sidePanel.managerLinks.locations"),
      uri: "/manager/locations",
    },
    {
      name: t("sidePanel.managerLinks.other"),
      uri: "/manager/other",
    },
  ];
};

const adminLinks = function(t: TFunction): LinkType[] {
  return [
    {
      name: t("sidePanel.adminLinks.users"),
      uri: "/admin/accounts",
    },
  ];
};

export default function SidePanel() {
  const navigate = useNavigate();
  const state = useAccountStore(function(state) {
    return state;
  });
  const parsedToken = useAccountStore(function(state) {
    return state.parsedToken;
  });

  const isAuthenticated = !!parsedToken;
  const isParticipant =
    isAuthenticated && parsedToken.authorities.includes(Role.PARTICIPANT);
  const isManager =
    isAuthenticated && parsedToken.authorities.includes(Role.MANAGER);
  const isAdmin =
    isAuthenticated && parsedToken.authorities.includes(Role.ADMIN);

  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const openAccount = !!anchorEl;

  const handleOpen = function(e: React.MouseEvent<HTMLElement>) {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = function() {
    setAnchorEl(undefined);
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "10rem",
          left: -1,
          zIndex: 1,
        }}
      >
        <Tooltip title={t("sidePanel.openSidePanelButtonTooltip")}>
          <Fab
            onClick={() => setOpen(true)}
            size="small"
            sx={{
              borderRadius: "0 50% 50% 0",
              padding: "1.5rem 1.5rem 1.5rem 1.5rem",
            }}
            aria-label={t("sidePanel.ariaLabel.openSidePanelButton")}
          >
            <MenuIcon></MenuIcon>
          </Fab>
        </Tooltip>
      </Box>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.80)",
            color: "white",
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "center",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
          <Typography flexGrow={1}></Typography>
          {state.parsedToken && (
            <>
              <Tooltip onClick={handleOpen} title="Konto">
                <IconButton
                  sx={{
                    borderRadius: "0.5rem",
                    color: "white",
                  }}
                >
                  <Person></Person>
                  <Typography>{`${state.parsedToken?.given_name} ${state.parsedToken?.family_name}`}</Typography>
                </IconButton>
              </Tooltip>
              <Menu
                open={openAccount}
                onClose={handleClose}
                anchorEl={anchorEl}
              >
                <MenuItem
                  onClick={function() {
                    navigate("/my-profile");
                    handleClose();
                    setOpen(false);
                  }}
                >
                  <Typography>
                    {t("sidePanel.authenticatedLinks.myProfile")}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={function() {
                    navigate("/logout");
                    handleClose();
                    setOpen(false);
                  }}
                >
                  <Typography>
                    {t("sidePanel.authenticatedLinks.logout")}
                  </Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Container>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: "center",
            alignItems: "center",
            borderTop: `1px solid ${Colors.GOLD}`,
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: "1rem",
              left: "1rem",
            }}
          >
            <Tooltip title={t("sidePanel.closeSidePanelTooltip")}>
              <Fab
                onClick={() => setOpen(false)}
                size="small"
                sx={{
                  borderRadius: 2,
                }}
              >
                <CloseIcon></CloseIcon>
              </Fab>
            </Tooltip>
          </Box>
          <Grid2 container spacing={2} width={"100%"} justifyContent={"start"}>
            {!isAuthenticated && (
              <Grid2 size={breakpoints}>
                <Typography textAlign={"start"} variant="h5">
                  {t("sidePanel.publicLinksHeading")}
                </Typography>
                <List>
                  {publicLinks(t).map(function(e) {
                    return (
                      <ListItem key={e.name}>
                        <StyledLink
                          onClick={function() {
                            navigate(e.uri);
                            setOpen(false);
                          }}
                          style={{ color: "white" }}
                          to={e.uri}
                        >
                          {e.name}
                        </StyledLink>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid2>
            )}
            {isParticipant && (
              <Grid2 size={breakpoints}>
                <Typography textAlign={"start"} variant="h5">
                  {t("sidePanel.authenticatedLinksHeading")}
                </Typography>
                <List>
                  {authenticatedLinks(t).map(function(e) {
                    return (
                      <ListItem key={e.uri}>
                        <StyledLink
                          onClick={function() {
                            navigate(e.uri);
                            setOpen(false);
                          }}
                          style={{ color: "white" }}
                          to={e.uri}
                        >
                          {e.name}
                        </StyledLink>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid2>
            )}
            {isManager && (
              <Grid2 size={breakpoints}>
                <Typography textAlign="start" variant="h5">
                  {t("sidePanel.managerLinksHeading")}
                </Typography>
                <List>
                  {managerLinks(t).map(function(e) {
                    return (
                      <ListItem key={e.uri}>
                        <StyledLink
                          onClick={function() {
                            navigate(e.uri);
                            setOpen(false);
                          }}
                          style={{ color: "white", textAlign: "left" }}
                          to={e.uri}
                        >
                          {e.name}
                        </StyledLink>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid2>
            )}
            {isAdmin && (
              <Grid2 size={breakpoints}>
                <Typography textAlign={"start"} variant="h5">
                  {t("sidePanel.adminLinksHeading")}
                </Typography>
                <List>
                  {adminLinks(t).map(function(e) {
                    return (
                      <ListItem key={e.uri}>
                        <StyledLink
                          onClick={function() {
                            navigate(e.uri);
                            setOpen(false);
                          }}
                          style={{ color: "white" }}
                          to={e.uri}
                        >
                          {e.name}
                        </StyledLink>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid2>
            )}
          </Grid2>
        </Container>
      </Drawer>
    </>
  );
}
