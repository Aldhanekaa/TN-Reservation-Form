import { Container, Alert, Stack, Button } from "@mui/material";
import NextLink from "next/link";

// import { useSelector } from "react-redux";
// import { RootStore } from "global/index";

// import CheckRoles from "utils/checkRoles";

export default function NotifCard() {
  // const authState = useSelector((state: RootStore) => state.user);

  return (
    <Container>
      <Stack sx={{ width: "100%" }} mt={2} spacing={2}>
        {/* 
        {authState.me &&
          // @ts-ignore
          authState.me.roleInTechnoNatura.teacher && (
            <Alert
              severity="info"
              action={
                <NextLink href="/help/about-teacher">
                  <Button color="inherit" size="small">
                    Learn More
                  </Button>
                </NextLink>
              }
            >
              You are a teacher account
            </Alert>
          )}

        {authState.me && !authState.me.isAccountVerified && (
          <Alert
            severity="warning"
            action={
              <NextLink href="/help/about-unverified-account">
                <Button color="inherit" size="small">
                  Learn More
                </Button>
              </NextLink>
            }
          >
            Your account isnt verified yet.
          </Alert>
        )} */}
      </Stack>
    </Container>
  );
}
