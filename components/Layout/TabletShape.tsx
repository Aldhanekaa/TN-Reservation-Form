import * as React from "react";

import { styled } from "@mui/material/styles";

const BoxShape = styled("div")`
  position: absolute;
  z-index: 9999;
`;

const CircleShape = styled("div")`
  position: absolute;
  z-index: 9999;
  border-radius: 50%;
`;

export default function MobileShapes({ windowWidth }: { windowWidth: number }) {
  if (windowWidth >= 520 && windowWidth <= 1024) {
    return (
      <>
        <CircleShape
          sx={{
            width: "150px",
            height: "150px",
            bottom: -50,
            right: -40,
            transform: "rotate(20deg)",
            backgroundColor: "#EF9325",
            zIndex: 99999,
          }}
        />
        <CircleShape
          sx={{
            width: "100px",
            height: "100px",
            bottom: -40,
            right: 70,
            transform: "rotate(20deg)",
            backgroundColor: "#FF4842",
          }}
        />
        <CircleShape
          sx={{
            width: "100px",
            height: "100px",
            top: -50,
            left: -30,
            transform: "rotate(20deg)",
            backgroundColor: "#EF9325",
            zIndex: 99999,
          }}
        />
        <CircleShape
          sx={{
            width: "160px",
            height: "160px",
            top: 20,
            left: -90,
            zIndex: 99999,
            transform: "rotate(20deg)",
            backgroundColor: "#FF4842",
          }}
        />
        <BoxShape
          sx={{
            width: "90px",
            height: "90px",
            bottom: -40,
            left: -10,
            transform: "rotate(20deg)",
            borderRadius: "20px",
            backgroundColor: "#3fa4dc",
          }}
        />
      </>
    );
  }
  return (
    <BoxShape
      sx={{
        width: "80px",
        height: "80px",
        bottom: -30,
        left: -30,
        transform: "rotate(20deg)",
        borderRadius: "20px",
        backgroundColor: "#3fa4dc",
      }}
    />
  );
}
