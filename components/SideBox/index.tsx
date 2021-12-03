import React from "react";
import { Box, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Commenter() {
  const [value, setValue] = React.useState("comment");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  return (
    <Container sx={{ pt: 5, pb: 5, height: "780px" }}>
      <Box
        sx={{
          border: "1px #4E667A solid",
          borderRadius: "10px",
          padding: "20px ",
          height: "100%",
          justifyContent: "stretch",
          alignItems: "stretch",
        }}
      >
        <Box sx={{ width: "100%", height: "96%", overflowY: "scroll" }}>
          asd
        </Box>
        <Tabs
          sx={{ width: "100%" }}
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
          centered
        >
          <Tab value="comment" label="Comment" />
          <Tab value="visitor" label="Visitor" />
        </Tabs>
      </Box>{" "}
    </Container>
  );
}
