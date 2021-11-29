import React from "react";
import Image from "next/image";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import back from "public/icons/BackButton.svg";
import next from "public/icons/NextButton.svg";
import IconButton from "./IconButton";

import styled from "@emotion/styled";

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

export function BackButton() {
  return (
    <>
      <Box sx={{ cursor: "pointer" }}>
        <Image src={next} width="40px" height="40px" />
      </Box>
    </>
  );
}
