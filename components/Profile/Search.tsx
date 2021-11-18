import * as React from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
// material
import { Popover, IconButton } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import SearchFilter from "./SearchFilter";

// ----------------------------------------------------------------------

const ArrowStyle = styled("span")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    top: -7,
    zIndex: 1,
    width: 12,
    left: 20,
    height: 12,
    content: "''",
    position: "absolute",
    borderRadius: "0 0 4px 0",
    transform: "rotate(-135deg)",
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

// ----------------------------------------------------------------------

MenuPopover.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  sx: PropTypes.object,
};

//   @ts-ignore
function MenuPopover({ children, sx, ...other }) {
  return (
    //   @ts-ignore
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: {
          mt: 1.5,
          p: "10px 10px",
          overflow: "inherit",
          //   @ts-ignore
          boxShadow: (theme) => theme.customShadows.z20,
          border: (theme) => `solid 1px ${theme.palette.grey[200]}`,
          ...sx,
          width: `${other.anchorEl.clientWidth}px`,
        },
      }}
      {...other}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
}

export default function SearchInput(props: { username: string }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLFormElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(Object(anchorRef.current));
  return (
    <>
      <Paper
        ref={anchorRef}
        component="form"
        sx={{
          p: "1px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          mb: 3,
          mt: 3,
        }}
        elevation={2}
      >
        <Tooltip title="Search Filter">
          <IconButton onClick={handleOpen} sx={{ p: "10px" }} aria-label="menu">
            {!open ? <MenuIcon /> : <CloseIcon />}
          </IconButton>
        </Tooltip>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={`Search ${props.username}'s Project`}
          inputProps={{ "aria-label": "search {username} project" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {/* @ts-ignore */}

      <SearchFilter
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
