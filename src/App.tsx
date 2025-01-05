import { RouterProvider } from "react-router-dom";
import router from "./router";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";
import "dayjs/locale/pl";
import "./i18/config"
import { Colors } from "./constants/styling";

export default function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
      <RouterProvider router={router}></RouterProvider>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 5000,
          style: {
            boxShadow: "0",
            border: `1px solid ${Colors.RED}`,
            color: Colors.RED,
          },
          iconTheme: {
            primary: Colors.GOLD,
            secondary: "white",
          },
          error: {
            iconTheme: {
              primary: Colors.RED,
              secondary: "white",
            },
          },
        }}
      ></Toaster>
    </LocalizationProvider>
  );
}
