import MainSection from "components/main/main";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Box } from "@mui/material";

import styled from "@emotion/styled";

import socket from "socket";
import toast from "react-hot-toast";

const ColourfulP = styled.p`
  animation: colorfultext 3s ease infinite;
  animation-fill-mode: forwards;
  @keyframes colorfultext {
    25% {
      color: #ea543f;
    }
    50% {
      color: #eda525;
    }
    75% {
      color: #6abd45;
    }
    100% {
      color #3fa4dc;
    }
  }
`;

export default function MainWrapper() {
  const [currentDuration, setCurrentDuration] = useState(0);
  const router = useRouter();
  const liveEventStarts = new Date(
    "Dec 2 2021 11:30:00 GMT+0700 (Western Indonesia Time)"
  ).getTime();
  const [shouldStart, setShouldStart] = useState(true);
  // const [timeRemaining, setTimeRemaining] = useState(
  //   (liveEventStarts - Date.now()) / 1000
  // );

  useEffect(() => {
    setInterval(() => {
      if (Date.now() >= liveEventStarts) {
        // router.reload();
      }
      // setTimeRemaining((liveEventStarts - Date.now()) / 1000);
    }, 1000);

    socket.on("reload", (s) => {
      router.reload();
    });

    socket.on("broadcast-message", (data) => {
      toast(data.msg, {
        duration: data.duration || 3000,
      });
    });
  }, []);

  if (!shouldStart) {
    return (
      <Container
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <ColourfulP style={{ fontWeight: 500 }}>
            TechnoNatura Art and Design Exhibition
          </ColourfulP>
          <p style={{ fontSize: 30 }}>This Event, hasn{"'"}t started yet</p>
          <p style={{ fontSize: 20 }}>
            Please wait.. or try to reload the website
          </p>
        </Box>
      </Container>
    );
  }
  return (
    <MainSection
      setCurrentDuration={setCurrentDuration}
      currentDuration={currentDuration}
    />
  );
}
