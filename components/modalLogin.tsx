import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import LoginComponent from "./login";

export default function ModalForLogin({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const [Submitting, setSubmitting] = React.useState<boolean>(false);

  return (
    <Dialog
      open={open}
      onClose={() => Submitting && handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent sx={{ p: "50px 0px" }}>
        <LoginComponent
          setSubmitting={() => setSubmitting(true)}
          finishLoggedIn={() => {
            setSubmitting(false);
            handleClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
