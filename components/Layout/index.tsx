import * as React from "react";

import HeaderBanner from "./headerbar";

import { Container, Stack, Paper, Typography, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import { isTablet, isDesktop } from "react-device-detect";
import { MHidden } from "components/@material-extend";
import Page from "components/Page";
import Logo from "./logo";

import { styled } from "@mui/material/styles";
import YouTube from "react-youtube";
import Form from "../form";

import FormSteps from "components/form/FormSteps";

const SectionStyle = styled(Paper)(() => ({
  width: "100%",
  maxWidth: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  backgroundImage: "url(/banner.png)",
  borderRadius: 0,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
}));
const ContentStyle = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: isDesktop ? "50%" : "100%",
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(!isDesktop ? 10 : 2, isDesktop ? 5 : 5),
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
  marginBottom: isDesktop ? 0 : "100px",
}));

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export default function ProminentAppBar() {
  const [currentStep, setStep] = React.useState<number>(0);
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);
  const [successSubmitted, setSuccessSubmitted] =
    React.useState<boolean>(false);

  const sectionRef = React.useRef<HTMLDivElement>();
  const windowWidth = useWindowWidth();

  return (
    <>
      <Container
        sx={{
          position: "relative",
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

      <RootStyle sx={{ mt: isDesktop ? 0 : 5 }}>
        <MHidden width="mdDown">
          <SectionStyle sx={{ zIndex: 999 }}>
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
          {!successSubmitted && (
            <StepSection>
              <Button
                size="small"
                style={{
                  color:
                    currentStep == 0 || isSubmitting ? "#8692A6" : "#D1D8E1",
                  cursor:
                    currentStep == 0
                      ? "not-allowed"
                      : isSubmitting
                      ? "wait"
                      : "pointer",
                }}
                startIcon={<ArrowBackIosNewIcon />}
                onClick={() => {
                  if (!isSubmitting) setStep(currentStep - 1);
                }}
                disabled={currentStep == 0 || isSubmitting}
              >
                Kembali
              </Button>

              <Stack direction="column" alignItems="end">
                <h4 style={{ fontWeight: 500, color: "#BDBDBD" }}>
                  STEP {currentStep + 1}/{FormSteps.length + 1}
                </h4>
                <p style={{ fontWeight: 700, color: "#fff" }}>
                  {currentStep == FormSteps.length
                    ? "Konfirmasi"
                    : FormSteps[currentStep].label}
                </p>
              </Stack>
            </StepSection>
          )}
          {/* {(isMobile || isTablet) && ( */}
          <Container
            maxWidth={`${isDesktop ? "sm" : "sm"}`}
            sx={{ paddingBottom: "40px", paddingTop: "50px" }}
          >
            <Form
              setStep={setStep}
              setSubmitting={setSubmitting}
              currentStep={currentStep}
              setSuccessSubmitted={setSuccessSubmitted}
            />
          </Container>
        </ContentStyle>
      </RootStyle>
    </>
  );
}
