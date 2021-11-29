// ----------------------------------------------------------------------
import { Theme, Components } from "@mui/material/styles";

export default function Card(theme: Theme): Components {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            // @ts-ignore
            theme.customShadows.z1,

          borderRadius:
            // @ts-ignore
            theme.shape.borderRadiusMd,
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h6" },
        subheaderTypographyProps: { variant: "body2" },
      },
      styleOverrides: {
        root: {
          padding: 3,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 3,
        },
      },
    },
  };
}
