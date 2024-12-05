import { createTheme, responsiveFontSizes } from "@mui/material";
import { plPL } from "@mui/x-date-pickers/locales";
import { Colors } from "../constants/styling";


export const defaultTheme = responsiveFontSizes(
  createTheme(
    {
      palette: {
        mode: "light",
        primary: {
          main: Colors.RED,
        },
        secondary: {
          main: Colors.GOLD,
        },
      },
      components: {
        MuiTablePagination: {
          defaultProps: {
            labelRowsPerPage: "Ilość wierszy na stronę",
            labelDisplayedRows: function({ from, to, count }) {
              if (count != -1) return `${from}-${to} z ${count}`;
              return `${from}-${to} z więcej niż ${to} stron`;
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              margin: "0.5rem",
            },
          },
          defaultProps: {
            variant: "contained",
          },
        },
        MuiTypography: {
          styleOverrides: {
            root: {
              textAlign: "center",
            },
          },
        },
        MuiCircularProgress: {
          defaultProps: {
            size: "1.5rem",
          },
          styleOverrides: {
            root: {
              color: "white",
            },
          },
        },
        MuiAutocomplete: {
          defaultProps: {
            size: "small",
          },
        },
        MuiTextField: {
          defaultProps: {
            size: "small",
            variant: "outlined",
          },
          styleOverrides: {
            root: {
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white"
              }
            }
          }
        },
      },
    },
    plPL,
  ),
);
