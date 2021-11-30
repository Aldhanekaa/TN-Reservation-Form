import styled from "@emotion/styled";
import { Stack } from "@mui/material";

const BoxCard = styled.div`
  width: auto;

  border: 2px #a8bccf solid;
  border-radius: 20px;
  padding: 22px 20px 22px 20px;
  display: inline-block;

  transition: 0.3s;

  &:hover {
    border: 2px #e3f2ff solid;
  }
`;

function StringToSeconds(value: string) {
  var a = value.split(":"); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  return seconds;
}

function Variant(variant: "red" | "green" | "yellow" | "blue") {
  switch (variant) {
    case "red":
      return "#ea543f";
      break;
    case "green":
      return "#6abd45";

    case "yellow":
      return "#eda525";
    case "blue":
      return "#3fa4dc";

    default:
      break;
  }
}

export default function EventHighlightCard({
  variant,
  title,
  duration,
  start,
  end,
  goTo,
}: {
  start: string;
  end: string;
  duration: number;
  variant: "red" | "green" | "yellow" | "blue";
  title: string;
  goTo: (seconds: number) => Promise<void>;
}) {
  return (
    <BoxCard
      style={{ backgroundColor: Variant(variant) }}
      onClick={() => {
        goTo(StringToSeconds(start));
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h4 style={{ fontSize: "15px", cursor: "pointer" }}>{title}</h4>
        <p style={{ fontSize: "10px", color: "#DCE0E3" }}>{duration} m</p>
      </Stack>
      <p style={{ color: "#DCE0E3", fontSize: "20px", fontWeight: 500 }}>
        {start} - {end}
      </p>
    </BoxCard>
  );
}
