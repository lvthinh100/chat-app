import { createContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import useLocalStorage from "../../hooks/useLocalStorage";
const ThemeContext = createContext();

const lightPalette = {
  palette: {
    mode: "light",

    primary: {
      light: "#DBBCAF",
      main: "#070707",
      dark: "#636362",
    },
    secondary: {
      light: "#f0e9dd",
      main: "#F4F2EE",
      dark: "#070707",
    },
    highlight: {
      main: "#E45617",
    },
    text: {
      custom: {
        main: "#332F4E",
        white: "#f0ecec",
        light: "#4f4a70",
        date: "#8985a3",
      },
    },
    background: {
      main: "#FDFDFD",
    },
  },
};

const darkPalette = {
  palette: {
    mode: "dark",

    primary: {
      main: "#6A986B",
    },
    secondary: {
      main: "#373737",
    },
    highlight: {
      main: "#ED7C68",
    },
    text: {
      custom: {
        white: "#fff",
        main: "#fff ",
        light: "#b2bbf0",
        date: "#C5C4B9",
      },
    },
    background: {
      main: "#2D2D2D",
    },
  },
};

const lightTheme = createTheme({
  ...lightPalette,
  typography: {
    allVariants: {
      color: "#332F4E",
    },
  },
});

const darkTheme = createTheme({
  ...darkPalette,
  typography: {
    allVariants: {
      color: "#fff",
    },
  },
});

export const MyThemeProvider = function ({ children }) {
  const [localTheme, setLocalTheme] = useLocalStorage("theme", "dark");
  const [mode, setMode] = useState(localTheme);
  const theme = mode === "light" ? lightTheme : darkTheme;
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setLocalTheme("dark");
    } else {
      setMode("light");
      setLocalTheme("light");
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
