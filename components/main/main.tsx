import React from "react";
import {
  Container,
  Box,
  Slider,
  IconButton as IconButtonMUI,
  Stack,
} from "@mui/material";
import PlayIcon from "public/icons/play.svg";
import VolumeHigh from "public/icons/volumeHigh.svg";
import FullScreen from "public/icons/fullScreen.svg";
import FullScreenExit from "public/icons/fullScreen-exit.svg";

import { overflow } from "html2canvas/dist/types/css/property-descriptors/overflow";
import ReactPlayer from "react-player";
import IconButton from "./IconButton";
import { styled, useTheme } from "@mui/material/styles";

const marks = [
  {
    value: 0,
    label: "0°C",
  },
  {
    value: 20,
    label: "20°C",
  },
  {
    value: 40,
    label: "37°C",
  },
  {
    value: 80,
    label: "40",
  },
  {
    value: 1000,
    label: "100°C",
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

export default function Main() {
  const theme = useTheme();
  const [isFullScreen, setFullScreen] = React.useState(false);

  function toggleFullScreenVideo() {
    var elem = document.getElementById("eventVideoPlayer");

    if (!isFullScreen) {
      if (elem) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();

          // @ts-ignore
        } else if (elem.webkitRequestFullscreen) {
          /* Safari */
          // @ts-ignore
          elem.webkitRequestFullscreen();
          // @ts-ignore
        } else if (elem.msRequestFullscreen) {
          /* IE11 */
          // @ts-ignore
          elem.msRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        // @ts-ignore
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        // @ts-ignore
        document.webkitExitFullscreen();
        // @ts-ignore
      } else if (document.msExitFullscreen) {
        /* IE11 */
        // @ts-ignore
        document.msExitFullscreen();
      }
    }
  }

  React.useEffect(() => {
    if (window.document) {
      // @ts-ignore
      window.document
        .getElementById("eventVideoPlayer")
        .addEventListener("fullscreenchange", (event) => {
          // document.fullscreenElement will point to the element that
          // is in fullscreen mode if there is one. If not, the value
          // of the property is null.
          if (document.fullscreenElement) {
            setFullScreen(true);
          } else {
            console.log("Leaving full-screen mode.");
            setFullScreen(false);
          }
        });
    }
  });

  return (
    <Container sx={{ pt: 5, pb: 5 }}>
      <Box
        sx={{
          width: "100%",
          pt: 3,
          pb: 5,
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        id="eventVideoPlayer"
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          config={{
            youtube: {
              playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                disablekb: 1,
                controls: 0,
                showinfo: 0,
                playsinline: 0,
                enablejsapi: 1,
                fs: 0,
                color: "white",
                modestbranding: 1,
                rel: 1,
                frameborder: 0,
              },
            },
          }}
          controls={false}
          width="100%"
          height={isFullScreen ? `100%` : "700px"}
          style={{ borderRadius: "10px", overflow: "hidden" }}
          onReady={() => {
            console.log("im ready!");
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: isFullScreen ? `100%` : "700px",

            zIndex: 99,
            top: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "55px",
              background: "rgba(63, 80, 96, 0.8)",
              position: "relative",
              bottom: isFullScreen ? 0 : 0,
            }}
          >
            asd
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "80px",
              background: "rgba(63, 80, 96, 0.8)",
              position: "relative",
              bottom: isFullScreen ? 25 : 0,
              pr: 5,
              pl: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Slider
                aria-label="Always visible"
                defaultValue={80}
                marks={marks}
                min={0}
                max={1000}
                valueLabelDisplay="on"
                size="small"
                // @ts-ignore
                sx={{
                  color: "#fff",
                  height: 4,
                  margin: 0,
                  padding: 0,
                  "& .MuiSlider-markLabel": {
                    display: "none",
                  },
                  "& .MuiSlider-mark": {
                    width: "5px",
                    height: "5px",
                  },
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    "&:before": {
                      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 8px ${
                        theme.palette.mode === "dark"
                          ? "rgb(255 255 255 / 16%)"
                          : "rgb(0 0 0 / 16%)"
                      }`,
                    },
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                }}
              />
            </Box>
            <Box>
              <Stack flexDirection="row" justifyContent="space-between">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButtonMUI>
                    <IconButton src={PlayIcon} width="25px" height="25px" />
                  </IconButtonMUI>
                  <IconButtonMUI sx={{ ml: "2px", mr: "2px" }}>
                    <IconButton src={VolumeHigh} width="25px" height="25px" />
                  </IconButtonMUI>
                  <p
                    style={{
                      fontWeight: 200,
                      fontSize: 10,
                    }}
                  >
                    00:02 / 10:23
                  </p>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <p style={{ fontWeight: 200, fontSize: 10 }}>
                    Life is still on going, 頑張って！ {":')"}
                  </p>
                  <IconButtonMUI
                    sx={{ ml: "2px", mr: "2px" }}
                    onClick={toggleFullScreenVideo}
                  >
                    <IconButton
                      src={isFullScreen ? FullScreenExit : FullScreen}
                      width="25px"
                      height="25px"
                    />
                  </IconButtonMUI>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
