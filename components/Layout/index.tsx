import * as React from "react";

import HeaderBanner from "./headerbar";

import { Container, Stack, Paper, Typography, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { isTablet } from "react-device-detect";
import { MHidden } from "components/@material-extend";
import Page from "components/Page";
import Logo from "./logo";

import { styled } from "@mui/material/styles";
import YouTube from "react-youtube";

const SectionStyle = styled(Paper)(() => ({
  width: "100%",
  maxWidth: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundImage: "url(/banner.webp)",
  borderRadius: 0,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
}));
const ContentStyle = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: "50%",
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 5),
}));

const StepSection = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: theme.spacing(0, 5),
  position: "absolute",
  top: 30,
  right: 0,
  zIndex: 999,
  width: "100%",
}));

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export default function ProminentAppBar() {
  const sectionRef = React.useRef<HTMLDivElement>();
  const windowWidth = useWindowWidth();

  console.log(sectionRef);
  console.log(windowWidth);

  return (
    <>
      <Container
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          width: "100%",
          padding: 0,
          zIndex: 999,
        }}
        style={{ padding: 0 }}
      >
        {!isTablet ? (
          <Container
            maxWidth="sm"
            sx={{
              padding: 0,
            }}
          >
            <HeaderBanner />
          </Container>
        ) : (
          <HeaderBanner />
        )}{" "}
      </Container>

      <RootStyle>
        <MHidden width="mdDown">
          <SectionStyle>
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 0,
                zIndex: 999,
                transform: "scale(0.7)",
              }}
            >
              <Logo />
            </div>
            <div
              style={{
                zIndex: 999,
                padding: `0px ${windowWidth >= 1650 ? "80px" : "40px"}`,
                textAlign: "center",
              }}
              // @ts-ignore
              ref={sectionRef}
            >
              <YouTube videoId="ALdgdGgF1a8" opts={{ width: "100%" }}></YouTube>
              <Typography variant="h4" sx={{ mb: 5, color: "#fff" }}>
                TechnoNatura Art Exhibition Trailer
              </Typography>
            </div>
            <Paper
              sx={{
                width: "100%",
                position: "absolute",
                top: 0,

                height: "100%",
                borderRadius: "0",
                background: "rgba(239, 147, 37, 0.8)",
              }}
            ></Paper>
          </SectionStyle>
        </MHidden>

        <ContentStyle style={{ position: "relative" }}>
          {" "}
          <StepSection>
            <Button
              size="small"
              style={{ color: "#8692A6" }}
              startIcon={<ArrowBackIosNewIcon />}
            >
              Back
            </Button>

            <Stack direction="column">
              <h4 style={{ fontWeight: 300, color: "#BDBDBD" }}>STEP 01/03</h4>
              <p style={{ fontWeight: 700, color: "#8692A6" }}>
                Data Pendamping
              </p>
            </Stack>
          </StepSection>
          asdasd
        </ContentStyle>
      </RootStyle>
    </>
  );
}
