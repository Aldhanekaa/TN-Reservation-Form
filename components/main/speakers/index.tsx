import { Container, Box } from "@mui/material";
import speakers from "data/speakers";
import SpeakerCard from "./speakerCard";

export default function Speaker() {
  return (
    <Container sx={{ pt: 5, pb: 5 }}>
      <h2 style={{ fontSize: "48px", fontWeight: 800 }}>
        Event Featuring Speakers
      </h2>
      <p style={{ fontWeight: 300 }}>omg</p>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "auto",
            mt: 2,
            position: "relative",

            pt: 2,
            pr: 2,
            pl: 2,
          }}
        >
          {speakers.map((speaker) => (
            <SpeakerCard
              name={speaker.name}
              // @ts-ignore
              src={speaker.src}
              role={speaker.role}
              key={speaker.name}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
