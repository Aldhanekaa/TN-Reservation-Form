import { Box } from "@mui/material";

import styled from "@emotion/styled";

export default function NavbarMain() {
  return (
    <Box
      maxWidth="xl"
      sx={{
        pt: 3,
        pb: 3,
        pr: 10,
        pl: 10,

        background: "#314557",
        textAlign: "center",
        fontSize: 2,
      }}
    >
      <p style={{ fontWeight: 200 }}>
        (c) 2021 TechnoNatura - Built by Aldhanekaa{" "}
      </p>
    </Box>
  );
}
