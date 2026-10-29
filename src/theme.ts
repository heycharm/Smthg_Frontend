import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    background: {
      default: "#07110F",
      paper: "#0E1B17",
    },

    primary: {
      main: "#42D6B5",
    },

    text: {
      primary: "#F2F7F5",
      secondary: "#81908B",
    },

    divider: "#1C302A",
  },

  typography: {
    fontFamily: '"Poppins", sans-serif',

    h1: {
      fontWeight: 600,
      letterSpacing: "-0.04em",
    },

    h2: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },

    h3: {
      fontWeight: 600,
    },

    h4: {
      fontWeight: 600,
    },

    h5: {
      fontWeight: 600,
    },

    h6: {
      fontWeight: 600,
    },

    body1: {
      fontWeight: 400,
    },

    body2: {
      fontWeight: 400,
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid #1C302A",
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
