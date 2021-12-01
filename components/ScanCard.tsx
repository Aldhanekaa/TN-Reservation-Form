import React from "react";

import {
  Typography,
  Card,
  CircularProgress,
  CardActionArea,
  Button,
  Container,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { isDesktop } from "react-device-detect";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getSession, getSessionByLevel } from "utils/getSession";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CloseIcon from "@mui/icons-material/Close";
// material
import { experimentalStyled as styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { ReservationI } from "model/reservation";

import getReservation from "utils/getReservation";
import registerReservation from "utils/registerReservation";

import toast from "react-hot-toast";
import socket from "socket";

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

// utils
// import { fShortenNumber } from "../../../utils/formatNumber";

// import styles from "../styles/Home.module.scss";

// eslint-disable-next-line arrow-body-style

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 5),
  // @ts-ignore
  color: theme.palette.primary.darker,
  // @ts-ignore
  backgroundColor: theme.palette.primary.lighter,
}));

function ScanCard() {
  const [visitors, setVisitors] = React.useState(0);
  React.useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("visitorNumbers", (data) => {
      setVisitors(data);
    });
  });
  return (
    <>
      <CardActionArea sx={{ borderRadius: "16px" }}>
        <RootStyle>
          <SupervisedUserCircleIcon
            style={{ width: "100%" }}
            sx={{ fontSize: 55 }}
          />

          <Typography variant="h5">
            {visitors} People are watching live event.
          </Typography>
        </RootStyle>
      </CardActionArea>
    </>
  );
}

export default ScanCard;
