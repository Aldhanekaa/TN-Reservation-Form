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
  if (windowWidth <= 525) {
    return (
      <>
        <CircleShape
          sx={{
            width: "125px",
            height: "125px",
            bottom: -50,
            right: -30,
            transform: "rotate(20deg)",
            backgroundColor: "#EF9325",
            zIndex: 99999,
          }}
        />
        <CircleShape
          sx={{
            width: "80px",
            height: "80px",
            bottom: -30,
            right: 70,
            transform: "rotate(20deg)",
            backgroundColor: "#FF4842",
          }}
        />
        <CircleShape
          sx={{
            width: "60px",
            height: "60px",
            top: -10,
            left: -30,
            transform: "rotate(20deg)",
            backgroundColor: "#EF9325",
            zIndex: 99999,
          }}
        />
        <CircleShape
          sx={{
            width: "120px",
            height: "120px",
            top: 35,
            left: -75,
            zIndex: 99999,
            transform: "rotate(20deg)",
            backgroundColor: "#FF4842",
          }}
        />
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
