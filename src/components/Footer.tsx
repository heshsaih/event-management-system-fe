import {
  Box,
  Container,
  Divider,
  Grid2,
  GridBaseProps,
  List,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import ListLink from "./ListLink";
import { Styling } from "../constants/styling";

type FooterElementProps = PropsWithChildren;

const breakpoints: GridBaseProps["columns"] = {
  xs: 12,
  sm: 12,
  md: 12,
  lg: 4,
  xl: 4,
};

function FooterElement({ children }: FooterElementProps) {
  return (
    <Container
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "2rem",
        width: "100%",
      }}
    >
      {children}
    </Container>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 4rem 0 4rem",
        backgroundColor: "primary.main",
        color: "white",
        borderRadius: `${Styling.BORDER_RADIUS} ${Styling.BORDER_RADIUS} 0 0`,
        marginX: "1rem",
      }}
    >
      <Grid2 container spacing={1} width={"100%"}>
        <Grid2 size={breakpoints}>
          <FooterElement>
            <Typography fontSize={20} marginBottom="2rem">
              Politechnika Łódzka
            </Typography>
            <Typography>
              ul. Żeromskiego 116
              <br></br>
              90-924 Łódź
              <br></br>
              NIP: 727 002 18 95
            </Typography>
          </FooterElement>
        </Grid2>
        <Grid2 size={breakpoints}>
          <FooterElement>
            <Typography fontSize={25}>Centrum E-Learningu</Typography>
            <List
              sx={{
                width: "60%",
              }}
            >
              <ListLink
                href="https://port.edu.p.lodz.pl/course/view.php?id=22"
                icon={<HomeIcon></HomeIcon>}
                text="Strona główna CEL PŁ"
              ></ListLink>
              <ListLink
                href="https://goo.gl/maps/gGUVvuM5svG2"
                icon={<MapIcon></MapIcon>}
                text="Lokalizacja"
              ></ListLink>
              <ListLink
                href="https://edu.p.lodz.pl/mod/page/view.php?id=7311"
                icon={<AccessTimeIcon></AccessTimeIcon>}
                text="Godziny pracy"
              ></ListLink>
            </List>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "60%",
                alignItems: "center",
              }}
            >
              <Divider
                sx={{
                  backgroundColor: "white",
                  margin: "1rem 0",
                  width: "100%",
                }}
              ></Divider>
              <Typography marginLeft={2}>Pomoc techniczna WIKAMP</Typography>
            </div>
            <List sx={{ width: "60%" }}>
              <ListLink
                href="mailto:bok@edu.p.lodz.pl"
                icon={<EmailIcon></EmailIcon>}
                text="bok@edu.p.lodz.pl"
              ></ListLink>
              <ListLink
                icon={<LocalPhoneIcon></LocalPhoneIcon>}
                text="+48426312806"
                link={false}
              ></ListLink>
            </List>
          </FooterElement>
        </Grid2>
        <Grid2 size={breakpoints}>
          <FooterElement>
            <Typography fontSize={25}>Przydatne linki</Typography>
            <List
              sx={{
                width: "60%",
              }}
            >
              <ListLink
                href="https://p.lodz.pl"
                icon={<HomeIcon></HomeIcon>}
                text="Strona główna PŁ"
              ></ListLink>
              <ListLink
                href="https://bg.p.lodz.pl"
                icon={<AutoStoriesIcon></AutoStoriesIcon>}
                text="Biblioteka PŁ"
              ></ListLink>
            </List>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "60%",
                alignItems: "center",
              }}
            >
              <Divider
                sx={{
                  backgroundColor: "white",
                  margin: "1rem 0",
                  width: "100%",
                }}
              ></Divider>
            </div>
            <List sx={{ width: "60%" }}>
              <ListLink
                href="https://poczta.p.lodz.pl"
                icon={<EmailIcon></EmailIcon>}
                text="Poczta elektroniczna"
              ></ListLink>
              <ListLink
                href="https://webdziekanat.p.lodz.pl"
                icon={<BadgeIcon></BadgeIcon>}
                text="WebDziekanat"
              ></ListLink>
              <ListLink
                href="https://office.p.lodz.pl"
                icon={<ApartmentIcon></ApartmentIcon>}
                text="Office"
              ></ListLink>
              <ListLink
                href="http://virtul.p.lodz.pl"
                icon={<BadgeIcon></BadgeIcon>}
                text="VirTUL"
              ></ListLink>
            </List>
          </FooterElement>
        </Grid2>
      </Grid2>
    </Box>
  );
}
