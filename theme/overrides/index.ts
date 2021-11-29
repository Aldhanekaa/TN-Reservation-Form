import { merge } from "lodash";
import { Theme, Components } from "@mui/material/styles";
import Card from "./Card";
import Lists from "./Lists";
import Paper from "./Paper";
import Input from "./Input";
import Button from "./Button";
import Tooltip from "./Tooltip";
import Backdrop from "./Backdrop";
import Typography from "./Typography";
import IconButton from "./IconButton";
import Autocomplete from "./Autocomplete";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme): Components {
  return {
    ...merge(
      Card(theme),
      Lists(),
      Paper(),
      Input(theme),
      Button(theme),
      Tooltip(theme),
      Backdrop(theme),
      Typography(),
      IconButton(theme),
      Autocomplete(theme)
    ),
    MuiTab: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[400],
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#26292E",
          boxShadow: "initial",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#555C67",
        },
        list: {
          backgroundColor: "#3C4149",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        selected: {
          backgroundColor: "#fff",
        },
      },
    },
  };
}
