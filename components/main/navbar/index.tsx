import { Container, Stack, Box } from "@mui/material";
import Image from "next/image";
import Logoo from "../../../public/logoo.svg";
import styled from "@emotion/styled";

const ArtStepsButton = styled.button`
  width: 140px;
  height: 50px;
  position: relative;

  background: linear-gradient(
        to top,
        rgba(111, 121, 138, 1),
        rgba(255, 255, 255, 0.5)
      )
      padding-box,
    linear-gradient(to right, #ea543f, #eda525, #6abd45, #3fa4dc) border-box;
  background-size: 200% 200%;

  border-radius: 50em;
  border: 2px solid transparent;

  font-family: "outfitFont";
  font-size: 16px;
  color: #edf4ff;

  cursor: pointer;

  transition: 0.3s;
  &:active {
    background: linear-gradient(
          to bottom,
          rgba(111, 121, 138, 0.8),
          rgba(111, 121, 138, 0)
        )
        padding-box,
      linear-gradient(to right, #ea543f, #eda525, #6abd45, #3fa4dc) border-box;
  }
  animation: mymove 5s ease infinite;
  animation-fill-mode: forwards;

  @keyframes mymove {
    0% {
      background-position: 10% 0%;
    }
    50% {
      background-position: 91% 100%;
    }
    100% {
      background-position: 10% 0%;
    }
  }
`;

const OnlineExhi = styled.a`
  color: #edf4ff;
  display: inline-block;
  margin-right: 20px;
  font-weight: 300;
  &:hover {
    text-decoration: underline;
  }
`;

export default function NavbarMain() {
  return (
    <>
      <Box
        maxWidth="xl"
        sx={{
          pt: 3,
          pb: 3,
          pr: 10,
          pl: 10,
          borderWidth: "1px",
          borderColor: "#4E667A",
          borderStyle: "solid",
        }}
      >
        <Stack
          direction="row"
          sx={{ width: "100%" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Image src={Logoo} width={200} height={75}></Image>
          <Box>
            <OnlineExhi href="https://adx.technonatura.sch.id">
              Online Exhibition
            </OnlineExhi>
            <ArtStepsButton>Art Steps</ArtStepsButton>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
