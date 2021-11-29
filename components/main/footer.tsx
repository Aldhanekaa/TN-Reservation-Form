import { Box } from "@mui/material";

import styled from "@emotion/styled";

const ColourfulA = styled.a`
  animation: colorfultext 3s ease infinite;
  animation-fill-mode: forwards;
  @keyframes colorfultext {
    25% {
      color: #ea543f;
    }
    50% {
      color: #eda525;
    }
    75% {
      color: #6abd45;
    }
    100% {
      color #3fa4dc;
    }
  }
`;

export default function NavbarMain() {
  return (
    <Box
      maxWidth="xl"
      sx={{
        pt: 2,
        pb: 2,
        pr: 10,
        pl: 10,

        background: "#314557",
        textAlign: "center",
        fontSize: 12,
      }}
    >
      <p style={{ fontWeight: 200 }}>
        © 2021 TechnoNatura - Built by{" "}
        <ColourfulA href="http://github.com/aldhanekaa">Aldhanekaa</ColourfulA>{" "}
      </p>
    </Box>
  );
}
