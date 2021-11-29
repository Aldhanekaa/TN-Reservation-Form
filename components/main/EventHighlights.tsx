import React from "react";
import Image from "next/image";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import back from "public/icons/BackButton.svg";
import next from "public/icons/NextButton.svg";
import IconButton from "./IconButton";

import styled from "@emotion/styled";
import EventHighlightCard from "./EventHighlightCard";

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 25px 10px 25px;

  --borderWidth: 3px;
  background: rgba(111, 121, 138, 1);
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(to bottom, #ea543f, #eda525, #6abd45, #3fa4dc);
    border-radius: calc(2 * var(--borderWidth));
    z-index: -1;
  }
`;

export default function EventHighlights() {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h2>{"Event's"} Highlights</h2>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              cursor: "pointer",
              background: "url(/icons/BackButton.svg)",
              height: "28px",
              width: "26px",
              transform: "scale(1.4)",
              marginRight: "10px",
              ":active": {
                background: "url(/icons/BackButtonClicked.svg)",
              },
            }}
          ></Box>
          <Box
            sx={{
              cursor: "pointer",
              background: "url(/icons/NextButton.svg)",
              height: "28px",
              width: "25px",
              transform: "scale(1.4)",
              ":active": {
                background: "url(/icons/NextButtonClicked.svg)",
              },
            }}
          ></Box>
        </Box>
      </Stack>

      <Box sx={{ position: "relative", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            width: "75px",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(63, 80, 96, 1), rgba(63, 80, 96, 0))",
            zIndex: 999,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "75px",
            height: "100%",
            background:
              "linear-gradient(to left, rgba(63, 80, 96, 1), rgba(63, 80, 96, 0))",
            zIndex: 999,
            right: 0,
          }}
        ></div>
        <Box
          sx={{
            width: "auto",
            mt: 2,
            overflowX: "scroll",
            position: "relative",
          }}
        >
          <div style={{ marginTop: 2, width: "100%", display: "flex" }}>
            <div>
              <EventHighlightCard
                title="Opening"
                start="00:00"
                end="05:00"
                duration={5}
                variant="red"
              />
            </div>
            <div>
              <EventHighlightCard
                title="Opening"
                start="00:00"
                end="05:00"
                duration={5}
                variant="yellow"
              />
            </div>

            <div>
              <EventHighlightCard
                title="Opening"
                start="00:00"
                end="05:00"
                duration={5}
                variant="green"
              />
            </div>

            <div>
              <EventHighlightCard
                title="Opening"
                start="00:00"
                end="05:00"
                duration={5}
                variant="blue"
              />
            </div>

            <div>
              <EventHighlightCard
                title="Opening"
                start="00:00"
                end="05:00"
                duration={5}
                variant="red"
              />
            </div>

            <div>
              <EventHighlightCard
                title="Opening"
                start="00:00"
                end="05:00"
                duration={5}
                variant="yellow"
              />
            </div>

            <div>
              <EventHighlightCard
                title="Opening"
                start="00:00"
                end="05:00"
                duration={5}
                variant="red"
              />
            </div>

            <div>
              <EventHighlightCard
                title="Opening"
                start="00:00"
                end="05:00"
                duration={5}
                variant="red"
              />
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}
