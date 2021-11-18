import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
// material
import { Popover } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

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
          p: "1px 10px",
          overflow: "inherit",
          //   @ts-ignore
          boxShadow: (theme) => theme.customShadows.z20,
          border: (theme) => `solid 1px ${theme.palette.grey[200]}`,
          ...sx,
          maxWidth: "200px",
          minWidth: "290px",
        },
      }}
      {...other}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
}

export default function SearchInput() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          placeholder="Search TechnoNatura Project"
          inputProps={{ "aria-label": "search TechnoNatura project" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {/* @ts-ignore */}
      <MenuPopover
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ py: 1 }}>
          <Typography style={{ fontWeight: 600 }} color="gray">
            Search Filter
          </Typography>
        </Box>
      </MenuPopover>
    </>
  );
}
