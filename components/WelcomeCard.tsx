import React from "react";

import { Typography, Card, Stack } from "@mui/material";

import { useSelector } from "react-redux";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// material
import { experimentalStyled as styled } from "@mui/material/styles";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";

// import styles from "../styles/Home.module.scss";

// eslint-disable-next-line arrow-body-style

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "start",
  padding: theme.spacing(5, 5),
  // @ts-ignore
  color: theme.palette.primary.darker,
  // @ts-ignore
  backgroundColor: theme.palette.primary.lighter,
}));

function HelpCard() {
  return (
    <RootStyle>
      <Stack direction="row" alignItems="center">
        <AdminPanelSettingsIcon sx={{ fontSize: 55 }} />
        <Typography variant="h3">ADX 2021 Admin Panel</Typography>
      </Stack>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Welcome !!
      </Typography>
    </RootStyle>
  );
}

export default HelpCard;
