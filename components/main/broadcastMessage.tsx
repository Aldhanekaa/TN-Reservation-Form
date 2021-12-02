import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import socket from "socket";

export default function BroadcastMessage() {
  const [message, setMessage] = React.useState<{
    msg: string;
    duration: number;
  }>();

  React.useEffect(() => {
    socket.on("broadcast-message", (data) => {
      console.log("e");
      setMessage(data.msg);

      setTimeout(() => {
        setMessage(undefined);
      }, data.duration);
    });
  }, []);

  if (message) {
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="outlined" severity="info">
          This is an info alert — check it out!
        </Alert>
      </Stack>
    );
  }

  return <p>asdas</p>;
}
