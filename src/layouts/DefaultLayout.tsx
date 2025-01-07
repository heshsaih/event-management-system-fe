import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidePanel from "../components/SidePanel";
import { defaultTheme } from "../style/defaultTheme";
import { useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";

export default function DefaultLayout() {
  const location = useLocation();

  useEffect(function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [location]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <ScrollToTop></ScrollToTop>
      <CssBaseline></CssBaseline>
      <Navbar></Navbar>
      <SidePanel></SidePanel>
      <Container
        disableGutters
        sx={{
          marginTop: "8rem",
          minHeight: "80vh",
          paddingX: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          marginBottom: "4rem",
        }}
      >
        <Outlet></Outlet>
      </Container>
      <Footer></Footer>
    </ThemeProvider>
  );
}
