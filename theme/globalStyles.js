import { withStyles } from "@mui/styles";
import palette from "./palette";
// ----------------------------------------------------------------------

const GlobalStyles = withStyles(() => ({
  "@global": {
    fontFamily: "outfitFont",
    "*": {
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
    html: {
      width: "100%",
      height: "100%",
      "-ms-text-size-adjust": "100%",
      "-webkit-overflow-scrolling": "touch",
      fontFamily: "outfitFont",
    },
    body: {
      width: "100%",
      height: "100%",
      fontFamily: "outfitFont",
    },
    "#root": {
      width: "100%",
      height: "100%",
    },
    input: {
      "&[type=number]": {
        MozAppearance: "textfield",
        "&::-webkit-outer-spin-button": { margin: 0, WebkitAppearance: "none" },
        "&::-webkit-inner-spin-button": { margin: 0, WebkitAppearance: "none" },
      },
    },
    textarea: {
      "&::-webkit-input-placeholder": { color: palette.text.disabled },
      "&::-moz-placeholder": { opacity: 1, color: palette.text.disabled },
      "&:-ms-input-placeholder": { color: palette.text.disabled },
      "&::placeholder": { color: palette.text.disabled },
    },
    a: { color: palette.primary.main },
    img: { display: "block", maxWidth: "100%" },
  },
}))(() => null);

export default GlobalStyles;
