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
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getSession, getSessionByLevel } from "utils/getSession";

import DoneAllIcon from "@mui/icons-material/DoneAll";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CloseIcon from "@mui/icons-material/Close";
// material
import { experimentalStyled as styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { ReservationI } from "model/reservation";

import getReservation from "utils/getReservation";
import registerReservation from "utils/registerReservation";

import toast from "react-hot-toast";

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
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [loading, setOnLoading] = React.useState(false);

  const [result, setResult] = React.useState<string>("");
  const [reservation, setReservation] = React.useState<
    ReservationI | undefined
  >();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    const success = new Audio(
      "https://res.cloudinary.com/dh3vfns2y/video/upload/v1637328821/04%20Secondary%20System%20Sounds/navigation-cancel_pzrlcd.wav"
    );
    await success.play();
    setOpen(false);
  };

  const handleScan = async (data: string | null) => {
    if (data) {
      const getReservationToast = toast.loading("Receiving Reservation..");

      setResult(data);
      setOnLoading(true);

      const reservation = await getReservation(data);
      if (reservation.item) {
        const success = new Audio(
          "https://res.cloudinary.com/dh3vfns2y/video/upload/v1637328820/03%20Primary%20System%20Sounds/state-change_confirm-up_zihjpm.wav"
        );
        await success.play();
        setOnLoading(false);

        toast.dismiss(getReservationToast);
        toast.success(reservation.message);

        setReservation(reservation.item);
        setResult("");
        return;
      }
      if (reservation.message) {
        const success = new Audio(
          "https://res.cloudinary.com/dh3vfns2y/video/upload/v1637328822/04%20Secondary%20System%20Sounds/navigation_unavailable-selection_kxxvmd.wav"
        );
        await success.play();
        toast.error(reservation.message);
      }
      setOnLoading(false);

      toast.dismiss(getReservationToast);
      setResult("");
      return;
    }
  };

  const handleRegisterReservation = async () => {
    if (reservation) {
      const getReservationToast = toast.loading("Registering Reservation");

      setOnLoading(true);
      const reservationScope = await registerReservation(reservation?.id);
      console.log(reservationScope);
      if (reservationScope.status == "success") {
        const success = new Audio(
          "https://res.cloudinary.com/dh3vfns2y/video/upload/v1637328823/01%20Hero%20Sounds/hero_simple-celebration-01_l4zgvz.wav"
        );
        await success.play();
        setOnLoading(false);
        toast.dismiss(getReservationToast);
        toast.success(reservationScope.message);

        setSuccess(true);
        setReservation(undefined);

        return;
      }
      if (reservationScope.message) {
        const success = new Audio(
          "https://res.cloudinary.com/dh3vfns2y/video/upload/v1637328822/04%20Secondary%20System%20Sounds/navigation_unavailable-selection_kxxvmd.wav"
        );
        await success.play();
        toast.error(reservationScope.message);
      }
      setOnLoading(false);

      toast.dismiss(getReservationToast);
      setReservation(undefined);

      return;
    }
  };

  const cancelVerifyPresence = async () => {
    const success = new Audio(
      "https://res.cloudinary.com/dh3vfns2y/video/upload/v1637328821/04%20Secondary%20System%20Sounds/navigation-cancel_pzrlcd.wav"
    );
    await success.play();
    setResult("");
    setReservation(undefined);
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  return (
    <>
      <CardActionArea sx={{ borderRadius: "16px" }} onClick={handleClickOpen}>
        <RootStyle>
          <QrCodeScannerIcon style={{ width: "100%" }} sx={{ fontSize: 55 }} />

          <Typography variant="h5">Scan QR Code</Typography>
        </RootStyle>
      </CardActionArea>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Registration Scan{" "}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {!success && result == "" && !reservation && (
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
              onLoad={() => {
                console.log("owo");
              }}
            />
          )}
          {success && (
            <>
              <Stack
                direction={isDesktop ? `row` : "column"}
                alignItems="center"
                sx={{ mt: "10px" }}
                className="QRCode-Card"
              >
                <Box sx={{ mb: 1 }}>
                  <DoneAllIcon sx={{ color: "#3F5060", fontSize: 250 }} />
                </Box>
                <Box
                  sx={{ padding: isDesktop ? "0" : "5px 25px", width: "100%" }}
                >
                  <Typography
                    style={{
                      color: "#3F5060",
                      fontSize: "15px",
                      fontFamily: "outfitFont",
                      fontWeight: 500,
                    }}
                  >
                    <b style={{ fontSize: "24px" }}>
                      Berhasil Register Reservasi
                    </b>
                  </Typography>
                </Box>
              </Stack>
              <Button
                sx={{ color: "#fff" }}
                fullWidth
                variant="contained"
                onClick={() => {
                  setSuccess(false);
                  setResult("");
                }}
              >
                Scan Selanjutnya
              </Button>
            </>
          )}
          {reservation && (
            <>
              <Stack
                direction={isDesktop ? `row` : "column"}
                alignItems="center"
                sx={{ mt: "10px" }}
                className="QRCode-Card"
              >
                <Box sx={{ mb: 1 }}>
                  <SupervisedUserCircleIcon
                    sx={{ color: "#3F5060", fontSize: 250 }}
                  />
                </Box>
                <Box
                  sx={{ padding: isDesktop ? "0" : "5px 25px", width: "100%" }}
                >
                  <Typography
                    style={{
                      color: "#3F5060",
                      fontSize: "15px",
                      fontFamily: "outfitFont",
                      fontWeight: 500,
                    }}
                  >
                    Nama Pendamping <br />{" "}
                    <b style={{ fontSize: "24px" }}>
                      {reservation.reservation.nama_pendamping}
                    </b>
                  </Typography>
                  <Typography
                    style={{
                      color: "#647585",
                      fontSize: "15px",
                      fontFamily: "outfitFont",
                      fontWeight: 500,
                    }}
                  >
                    Nama siswa <br />{" "}
                    <b style={{ fontSize: "18px" }}>
                      {reservation.nama_lengkap}
                    </b>
                  </Typography>
                  <Typography
                    sx={{ mt: isDesktop ? 4 : 2, mb: 4 }}
                    style={{
                      color: "#7B8E9F",
                      fontSize: "14px",
                      fontFamily: "outfitFont",
                      fontWeight: 500,
                    }}
                  >
                    {
                      // @ts-ignore
                      getSession(
                        // @ts-ignore
                        getSessionByLevel(String(reservation.level))
                      )
                    }
                  </Typography>
                </Box>
              </Stack>
              {/* @ts-ignore */}
              <LoadingButton
                sx={{ color: "#fff" }}
                fullWidth
                variant="contained"
                onClick={handleRegisterReservation}
                loading={loading}
              >
                Verify Presence
              </LoadingButton>
              <LoadingButton
                sx={{ color: "#EF9325", mt: 2 }}
                fullWidth
                variant="outlined"
                onClick={cancelVerifyPresence}
                loading={loading}
              >
                Cancel
              </LoadingButton>
            </>
          )}
          {!success && result && !reservation && (
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />{" "}
              <Typography
                sx={{
                  fontFamily: "outfitFont",
                  fontWeight: 300,
                  color: "#EF9325",
                  ml: 2,
                }}
              >
                Fetching Reservation Info..
              </Typography>
            </Container>
          )}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </>
  );
}

export default ScanCard;
