import {
  CircularProgress,
  Container,
  Grid,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useState } from "react";
import React from "react";
import AdminLogin from "components/login";
import WelcomeCard from "components/WelcomeCard";
import ScanCard from "components/ScanCard";

import ReloadClients from "components/admin/ReloadClients";
export default function AdminPage() {
  const [value, setValue] = useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  if (!loggedIn) {
    return <AdminLogin setLoggedIn={setLoggedIn} />;
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 5 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={6}
          // @ts-ignore
          md={8}
        >
          <WelcomeCard />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          // @ts-ignore
          md={4}
        >
          <ScanCard />
        </Grid>
      </Grid>

      <ReloadClients />
      <Button variant="outlined">Broadcast Message</Button>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
        sx={{ mt: 2 }}
      >
        <Tab label="Siswa" />
        <Tab label="Mentor" />
        <Tab label="Registered Seats" />
      </Tabs>
    </Container>
  );
}
