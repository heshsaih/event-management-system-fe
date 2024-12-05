import {
  Box,
  Container,
  Drawer,
  Fab,
  Grid2,
  Grid2Props,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../constants/styling";
//import useAccountStore, { Role } from "../data/useAccountStore";
import StyledLink from "./StyledLink";
import { useNavigate } from "react-router-dom";

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

const publicLinks: LinkType[] = [
  {
    name: "Zaloguj się",
    uri: "/login",
  },
  {
    name: "Zarejestruj się",
    uri: "/register",
  },
  {
    name: "Wydarzenia",
    uri: "/events",
  },
  {
    name: "Przypomnij hasło",
    uri: "/forgot-password"
  }
];

const authenticatedLinks: LinkType[] = [
  {
    name: "Wydarzenia",
    uri: "/events",
  },
  {
    name: "Mój profil",
    uri: "/my-profile",
  },
];

const managerLinks: LinkType[] = [
  {
    name: "Zarządzanie wydarzeniami",
    uri: "/manager/events",
  },
  {
    name: "Stwórz wydarzenie",
    uri: "/manager/events/create?step=0",
  },
  {
    name: "Prelegenci",
    uri: "/manager/speakers",
  },
  {
    name: "Lokacje",
    uri: "/manager/locations",
  },
  {
    name: "Pozostałe parametry",
    uri: "/manager/other",
  },
];

const adminLinks: LinkType[] = [
  {
    name: "Użytkownicy",
    uri: "/admin/users",
  },
];

export default function SidePanel() {
  const navigate = useNavigate();
  //const parsedToken = useAccountStore(function (state) {
  //return state.parsedToken;
  //});

  // const foo = parsedToken?.role.flatMap(function (e) {
  // return e.authority;
  // });

  // const isAuthenticated = !!parsedToken;
  // const isParticipant =
  //   isAuthenticated &&
  //   parsedToken.role
  //     .flatMap(function (e) {
  //       return e.authority;
  //     })
  //     .includes(Role.PARTICIPANT);
  // const isManager =
  //   isAuthenticated &&
  //   parsedToken.role
  //     .flatMap(function (e) {
  //       return e.authority;
  //     })
  //     .includes(Role.MANAGER);
  // const isAdmin =
  //   isAuthenticated &&
  //   parsedToken.role
  //     .flatMap(function (e) {
  //       return e.authority;
  //     })
  //     .includes(Role.ADMIN);

  const isAuthenticated = true;
  const isParticipant = isAuthenticated && true;
  const isManager = isAuthenticated && true;
  const isAdmin = isAuthenticated && true;

  const [open, setOpen] = useState<boolean>(false);

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
        <Fab
          onClick={() => setOpen(true)}
          size="small"
          sx={{
            borderRadius: "0 50% 50% 0",
            padding: "1.5rem 1.5rem 1.5rem 1.5rem",
          }}
        >
          <MenuIcon></MenuIcon>
        </Fab>
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
          <Typography>siema eniu</Typography>
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
            <Fab
              onClick={() => setOpen(false)}
              size="small"
              sx={{
                borderRadius: 2,
              }}
            >
              <CloseIcon></CloseIcon>
            </Fab>
          </Box>
          <Grid2 container spacing={2} width={"100%"} justifyContent={"start"}>
            {!isAuthenticated && (
              <Grid2 size={breakpoints}>
                <Typography textAlign={"start"} variant="h5">
                  Użytkownik niezalogowany
                </Typography>
                <List>
                  {publicLinks.map(function(e) {
                    return (
                      <ListItem>
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
                  Uczestnik
                </Typography>
                <List>
                  {authenticatedLinks.map(function(e) {
                    return (
                      <ListItem>
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
                  Zarządca
                </Typography>
                <List>
                  {managerLinks.map(function(e) {
                    return (
                      <ListItem>
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
            {isAdmin && (
              <Grid2 size={breakpoints}>
                <Typography textAlign={"start"} variant="h5">
                  Admin
                </Typography>
                <List>
                  {adminLinks.map(function(e) {
                    return (
                      <ListItem>
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
