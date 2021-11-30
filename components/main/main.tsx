import Image from "next/image";
import React, { useState } from "react";
import {
  Container,
  Box,
  Slider,
  IconButton as IconButtonMUI,
  Stack,
  Button,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import PlayIcon from "public/icons/play.svg";
import VolumeHigh from "public/icons/volumeHigh.svg";
import FullScreen from "public/icons/fullScreen.svg";
import FullScreenExit from "public/icons/fullScreen-exit.svg";
import Menu from "public/icons/Menu.svg";
import eye from "public/icons/eye.svg";
import like from "public/icons/like.svg";
import share from "public/icons/share.svg";

import Logoo from "../../public/logoo.svg";

import ReactPlayer from "react-youtube";
import IconButton from "./IconButton";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import EventHighlights from "./EventHighlights";

// Throttled values
import { useWindowSize } from "@react-hook/window-size/throttled";

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
const DivSection = styled.div`
  padding: 10px 25px 10px 25px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(111, 121, 138, 1),
    rgba(111, 121, 138, 0)
  );
  cursor: pointer;
  &:active {
    background: linear-gradient(
      to bottom,
      rgba(111, 121, 138, 0.7),
      rgba(111, 121, 138, 0)
    );
  }
`;

function convertHMS(value: string) {
  const sec = parseInt(value, 10); // convert value to number if it's string
  let hours = Math.floor(sec / 3600); // get hours
  let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    // @ts-ignore
    hours = "0" + hours;
  }
  // @ts-ignore
  if (minutes < 10) {
    // @ts-ignore
    minutes = "0" + minutes;
  }
  // @ts-ignore
  if (seconds < 10) {
    // @ts-ignore
    seconds = "0" + seconds;
  }
  return hours + ":" + minutes + ":" + seconds; // Return is HH : MM : SS
}

export default function Main() {
  const liveEventStarts = new Date(
    "Dec 1 2021 09:00:00 GMT+0700 (Western Indonesia Time)"
  ).getTime();
  const liveEventEnds = new Date(
    "Dec 1 2021 11:30:00 GMT+0700 (Western Indonesia Time)"
  ).getTime();

  const [width, height] = useWindowSize();
  const [muted, setMuted] = useState(false);
  const [isPlaying, setPlaying] = useState(true);
  const [stateChange, setStateChange] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

  const theme = useTheme();
  const reactPlayer = React.useRef(null);
  const [isFullScreen, setFullScreen] = React.useState(false);
  const [isStarted, setStarted] = React.useState(false);

  async function toggleFullScreenVideo() {
    var elem = document.getElementById("eventVideoPlayer");

    if (!isFullScreen) {
      if (elem) {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();

          // @ts-ignore
        } else if (elem.webkitRequestFullscreen) {
          /* Safari */
          // @ts-ignore
          await elem.webkitRequestFullscreen();

          // @ts-ignore
        } else if (elem.msRequestFullscreen) {
          /* IE11 */
          // @ts-ignore
          await elem.msRequestFullscreen();
        }
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        // @ts-ignore
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        // @ts-ignore
        await document.webkitExitFullscreen();
        // @ts-ignore
      } else if (document.msExitFullscreen) {
        /* IE11 */
        // @ts-ignore
        await document.msExitFullscreen();
      }
      setPlaying(true);
    }
  }

  React.useEffect(() => {
    if (window.document) {
      // @ts-ignore
      window.document
        .getElementById("eventVideoPlayer")
        .addEventListener("fullscreenchange", () => {
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

  React.useEffect(() => {
    setInterval(() => {
      setCurrentTimeFunc();
      getDuration();
    }, 1000);
  }, []);

  async function getDuration() {
    const now = Date.now();

    if (now < liveEventEnds) {
      const currentDuration =
        // @ts-ignore
        await reactPlayer.current.internalPlayer.getDuration();
      setCurrentDuration(currentDuration);
    }
  }

  async function setCurrentTimeFunc() {
    if (isPlaying) {
      const currentTime =
        // @ts-ignore
        await reactPlayer.current.internalPlayer.getCurrentTime();
      setCurrentTime(currentTime);
    }
  }

  async function handlePlay() {
    // @ts-ignore
    reactPlayer.current.internalPlayer.playVideo();

    // @ts-ignore
    reactPlayer.current.internalPlayer.seekTo(currentTime, true);
  }

  async function IsMuted() {
    // @ts-ignore
    return await reactPlayer.current.internalPlayer.isMuted();
  }

  async function toggleVolume() {
    // console.log(reactPlayer.current.internalPlayer);

    const isMuted = await IsMuted();
    // @ts-ignore
    console.log(reactPlayer.current.internalPlayer);
    if (isMuted) {
      // @ts-ignore
      reactPlayer.current.internalPlayer.unMute();
      setMuted(false);
    } else {
      // @ts-ignore
      reactPlayer.current.internalPlayer.mute();
      setMuted(true);
    }
  }

  async function toggleVideo() {
    if (isPlaying) {
      // @ts-ignore
      await reactPlayer.current.internalPlayer.pauseVideo();
      setPlaying(false);
    } else {
      // @ts-ignore
      await reactPlayer.current.internalPlayer.playVideo();
      setPlaying(true);
    }
  }

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
        <Box
          style={{
            width: "100%",
            height: isFullScreen ? `100%` : "700px",
          }}
        >
          <ReactPlayer
            onPlay={() => {
              setStarted(true);
            }}
            videoId="xDpzyDu0MhE"
            id="react-player"
            className="fd"
            opts={{
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
              },
              width: "100%",
              height: isFullScreen ? `${height - 20}px` : "700px",
            }}
            ref={reactPlayer}
            onError={() => {}}
            onReady={() => handlePlay()}
            onStateChange={(e) => {
              setStateChange(e.data);
            }}
            onPlaybackRateChange={() => {
              console.log("hi!");
            }}
          />
        </Box>

        {stateChange == -1 && (
          <Box
            sx={{
              position: "absolute",
              top: "45%",
              bottom: "50%",
              left: "46%",
              right: "50%",
              zIndex: 99999,
            }}
          >
            <Button
              sx={{
                ml: "2px",
                mr: "2px",
                background: "rgba(60, 80, 96, 1)",
                color: "#fff",
                boxShadow: "none",
                transition: ".3s",
                ":hover": {
                  color: "rgba(63, 80, 96, 1)",
                  background: "#fff",
                  transform: "translateY(-5px)",
                },
                ":active": {
                  transform: "translateY(-3px)",
                },
              }}
              disableRipple
              variant="contained"
              onClick={handlePlay}
            >
              <PlayArrowIcon style={{ fontSize: "50px" }} />
            </Button>
          </Box>
        )}

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
              height: isFullScreen ? "70px" : "0px",
              background: "rgba(63, 80, 96, 0.8)",
              position: "relative",
              bottom: isFullScreen ? 0 : 0,
              borderBottomRightRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            {isFullScreen && (
              <Box
                sx={{
                  pr: 8,
                  pl: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Image src={Logoo} width={150} height={75} />
                <IconButtonMUI>
                  <IconButton src={Menu} width="25px" height="25px" />
                </IconButtonMUI>
              </Box>
            )}
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
            {isStarted ? (
              <>
                {" "}
                <Box sx={{ width: "100%" }}>
                  <Slider
                    onChange={(_e, values) => {
                      // @ts-ignore
                      reactPlayer.current.internalPlayer.seekTo(values, true);
                    }}
                    aria-label="Always visible"
                    defaultValue={currentTime}
                    marks={marks}
                    min={0}
                    max={currentDuration}
                    valueLabelDisplay="auto"
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
                      <IconButtonMUI onClick={toggleVideo}>
                        {isPlaying ? (
                          <PauseIcon style={{ color: "#fff" }} />
                        ) : (
                          <PlayArrowIcon style={{ color: "#fff" }} />
                        )}
                      </IconButtonMUI>
                      <IconButtonMUI
                        sx={{ ml: "2px", mr: "2px" }}
                        onClick={toggleVolume}
                      >
                        {muted ? (
                          <VolumeOffIcon style={{ color: "#fff" }} />
                        ) : (
                          <VolumeUpIcon style={{ color: "#fff" }} />
                        )}
                      </IconButtonMUI>
                      <p
                        style={{
                          fontWeight: 200,
                          fontSize: 10,
                        }}
                      >
                        {convertHMS(String(currentTime))} /{" "}
                        {convertHMS(
                          String((liveEventEnds - liveEventStarts) / 1000)
                        )}
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
              </>
            ) : (
              <LinearProgress color="inherit" />
            )}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          pt: 0,
          pb: 5,
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
          color: "#F3FAFF",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <DivSection
            style={{
              border: "2px #EA543F solid",
              fontWeight: 300,
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton src={eye} width="25px" height="25px" />
            <b style={{ marginLeft: "5px", marginRight: "5px" }}>100</b>{" "}
            Visitors Are Watching
          </DivSection>

          <Box sx={{ fontWeight: 600, display: "flex" }}>
            <DivSection
              style={{
                border: "2px #EDA525 solid",
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <IconButton src={share} width="25px" height="25px" />
              <p style={{ marginLeft: "5px" }}>Share</p>
            </DivSection>
            <Box style={{ position: "relative" }}>
              <DivSection
                style={{
                  border: "2px #6ABD45 solid",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton src={like} width="25px" height="25px" />
                <p style={{ marginLeft: "5px" }}>Like</p>
              </DivSection>
              {/* <p style={{ position: "absolute", bottom: -25, fontWeight: 500 }}>
                <b>100</b> Visitors Likes
              </p> */}
            </Box>
          </Box>
        </Stack>
      </Box>

      <EventHighlights />
    </Container>
  );
}
