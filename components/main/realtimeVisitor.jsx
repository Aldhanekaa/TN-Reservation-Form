import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import IconButton from "./IconButton";
import eye from "public/icons/eye.svg";
import socket from "socket";

const DivSection = styled.div`
  padding: 10px 25px 10px 25px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(111, 121, 138, 1),
    rgba(111, 121, 138, 0)
  );
  cursor: pointer;
  &:active {
    background: linear-gradient(
      to bottom,
      rgba(111, 121, 138, 0.7),
      rgba(111, 121, 138, 0)
    );
  }
`;

export default function RealtimeVisitor() {
  const [visitors, setVisitors] = useState(0);
  useEffect(() => {
    socket.on("visitorNumbers", (data) => {
      setVisitors(data);
    });
  });
  return (
    <DivSection
      style={{
        border: "2px #EA543F solid",
        fontWeight: 300,
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton src={eye} width="25px" height="25px" />
      <b style={{ marginLeft: "5px", marginRight: "5px" }}>{visitors}</b>{" "}
      Visitors Are Watching
    </DivSection>
  );
}
