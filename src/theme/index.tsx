"use client";

import { createTheme } from "@mui/material/styles";

export const green = "#44C55E";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#44C55E",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 22,
    h1: {
      fontSize: 25,
      fontWeight: "bold",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1C1917",
          padding: "20px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "99999px",
          textTransform: "inherit",
          padding: "8px 32px",
        },
      },
    },
  },
});

export default theme;
