import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import shape from "./shape";
import palette from "./palette";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
