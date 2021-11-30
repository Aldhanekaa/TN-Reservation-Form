import React from "react";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";

import styled from "@emotion/styled";
import EventHighlightCard from "./EventHighlightCard";
import Slider from "react-slick";

import eventHighlights from "data/eventHighlights";

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

function getVariant(variant: "red" | "green" | "yellow" | "blue" | "#fff") {
  switch (variant) {
    case "red":
      return "red";
      break;
    case "green":
      return "green";

    case "yellow":
      return "yellow";
    case "blue":
      return "blue";

    default:
      return "red";

      break;
  }
}

export default function EventHighlights({
  goTo,
}: {
  goTo: (seconds: number) => Promise<void>;
}) {
  const sliderRef = React.useRef(null);
  let savedVariant: "red" | "green" | "yellow" | "blue" | "#fff" = "#fff";

  React.useEffect(() => {
    if (window.document) {
      const slider = window.document.querySelector(".slider");
      //   const innerSlider = window.document.getElementById("slider-inner");

      let pressed = false;

      slider?.addEventListener("mousedown", (e) => {
        // @ts-ignore
        slider.style.cursor = "grabbing";

        pressed = true;
      });

      slider?.addEventListener("mouseenter", () => {
        // @ts-ignore
        slider.style.cursor = "grab";
      });

      slider?.addEventListener("mouseleave", () => {
        // @ts-ignore
        slider.style.cursor = "default";
      });

      slider?.addEventListener("mouseup", () => {
        // @ts-ignore
        slider.style.cursor = "grab";
        pressed = false;
      });

      slider?.addEventListener("mousemove", (e) => {
        if (!pressed) return;
        e.preventDefault();
      });
    }
  });

  function nextSlide() {
    console.log(sliderRef);
    // @ts-ignore
    sliderRef.current.slickNext();
  }
  function prevSlide() {
    // @ts-ignore
    sliderRef.current.slickPrev();
  }

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
            onClick={prevSlide}
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
            onClick={nextSlide}
          ></Box>
        </Box>
      </Stack>

      <Box
        sx={{ position: "relative", width: "100%", overflow: "hidden" }}
        id="slider"
      >
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
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
          id="slider-inner"
        >
          <Slider
            ref={sliderRef}
            className="slider"
            {...{
              dots: false,
              infinite: false,
              speed: 500,
              slidesToShow: 5,
              slidesToScroll: 5,
              initialSlide: 0,
              draggable: true,
              responsive: [
                {
                  breakpoint: 1210,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                  },
                },
                {
                  breakpoint: 985,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
                {
                  breakpoint: 755,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  },
                },
                {
                  breakpoint: 505,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                  },
                },
              ],
            }}
          >
            {eventHighlights.map((event, idx) => {
              const variant = getVariant(savedVariant);
              savedVariant = variant;
              console.log(savedVariant);
              return (
                <div key={idx}>
                  <EventHighlightCard
                    title={event.title}
                    start={event.start}
                    end={event.end}
                    duration={event.duration}
                    variant={variant}
                    goTo={goTo}
                  />
                </div>
              );
            })}
          </Slider>
        </Box>
      </Box>
    </>
  );
}
