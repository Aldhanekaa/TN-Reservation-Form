import PropTypes from "prop-types";
// material
import { CssBaseline } from "@mui/material/";
import {
  ThemeProvider,
  StyledEngineProvider as StylesProvider,
  createTheme,
} from "@mui/material/styles";

import NProgress from "components/Layout/nprogress";

//
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
// eslint-disable-next-line import/no-cycle
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

const theme = createTheme({
  palette,
  shape,
  // @ts-ignore
  typography,
  breakpoints,
  // @ts-ignore
  shadows,
  customShadows,
});

export { theme };
export default function ThemeConfig({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  // const themeOptions = useMemo(
  //   () => ({
  //     palette,
  //     shape,
  //     typography,
  //     breakpoints,
  //     shadows,
  //     customShadows,
  //   }),
  //   [],
  // );

  theme.components = componentsOverride(theme);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <NProgress />

        {children}
      </ThemeProvider>
    </StylesProvider>
  );
}

ThemeConfig.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};
