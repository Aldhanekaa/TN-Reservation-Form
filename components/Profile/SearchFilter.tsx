import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import PropTypes from "prop-types";
// material
import {
  Popover,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { useWindowWidth } from "@react-hook/window-size/throttled";

// ----------------------------------------------------------------------

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
  const [View, setView] = React.useState("grid");
  const [Sort, setSort] = React.useState("latest");
  const windowWidth = useWindowWidth();

  const handleChangeSort = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };
  const handleChangeView = (
    event: React.MouseEvent<HTMLElement>,
    newView: string
  ) => {
    if (newView) setView(newView);
  };

  const Views = [
    <ToggleButton value="grid" key="grid">
      <GridViewIcon />
    </ToggleButton>,
    <ToggleButton value="list" key="list">
      <ViewListIcon />
    </ToggleButton>,
  ];

  const control = {
    value: View,
    onChange: handleChangeView,
    exclusive: true,
  };

  return (
    <>
      {/* @ts-ignore */}
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
            width: `${
              other.anchorEl && other.anchorEl.clientWidth
                ? other.anchorEl.clientWidth
                : "10"
            }px`,
          },
        }}
        {...other}
      >
        <ArrowStyle className="arrow" />

        <SearchInput />
      </Popover>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
        alignItems="center"
      >
        <Typography
          fontSize={`${windowWidth >= 400 ? "20px" : "12px"}`}
          style={{ fontWeight: 600 }}
          color="gray"
        >
          Projects ✨
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Date</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={Sort}
              label="Date"
              onChange={handleChangeSort}
            >
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
          <ToggleButtonGroup size="small" {...control}>
            {Views}
          </ToggleButtonGroup>
        </Stack>
      </Stack>
    </>
  );
}

function SearchInput() {
  return (
    <Box sx={{ py: 1, width: "100%" }}>
      <Typography style={{ fontWeight: 600 }} color="gray">
        Advanced Filtering
      </Typography>
    </Box>
  );
}

export default MenuPopover;
