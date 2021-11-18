import * as React from "react";

import Box from "@mui/material/Box";
import { Paper, Stack } from "@mui/material";
import Image from "next/image";
import ExhibitionTransparentLogo from "public/adx2021kidstextonly-02.png";
import { isMobile } from "react-device-detect";

import { styled } from "@mui/material/styles";

// Throttled values
import { useWindowWidth } from "@react-hook/window-size/throttled";
import MobileShapes from "./MobileShape";
import TabletShapes from "./TabletShape";

const BoxShape = styled("div")`
  position: absolute;
  z-index: 9999;
`;

function LogoAndExhibitionTitle() {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ margin: "auto" }}
    >
      <Image
        src={ExhibitionTransparentLogo}
        alt="Picture of the author"
        width={85}
        height={70}
      />

      <h1 style={{ fontSize: 15, color: "#EF9325" }}>
        {" "}
        TechnoNatura Art Exhibition <br /> Reservation Form
      </h1>
    </Stack>
  );
}

export default function ProminentAppBar() {
  const windowWidth = useWindowWidth();

  if (!isMobile) {
    return <p></p>;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        sx={{
          width: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "0",
        }}
      >
        <Paper
          sx={{
            width: "100%",

            height: "200px",
            borderRadius: "0",
            background: "#3f5061",
          }}
        ></Paper>

        <BoxShape
          sx={{
            width: "90px",
            height: "90px",
            top: -40,
            right: -30,
            transform: "rotate(20deg)",
            borderRadius: "20px",
            backgroundColor: "#3fa4dc",
          }}
        />

        <MobileShapes windowWidth={windowWidth} />

        <TabletShapes windowWidth={windowWidth} />
        <Paper
          sx={{
            width: "100%",
            position: "absolute",
            zIndex: 999,
            top: 0,
            height: "100%",
            borderRadius: "0",
            background: "#3f5061",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform:
              windowWidth <= 1024 && windowWidth >= 520 ? "scale(1.8)" : "",
          }}
        >
          <LogoAndExhibitionTitle />
        </Paper>
      </Paper>
    </Box>
  );
}
