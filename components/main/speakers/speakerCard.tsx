import styled from "@emotion/styled";
import Image from "next/image";

const BoxCard = styled.div`
  width: 280px;

  padding: 22px 20px 22px 20px;
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
  position: relative;
  border-radius: 30px;

  transition: 0.3s;

  cursor: pointer;

  background: rgba(111, 121, 138, 1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 30px;
    padding: 3px;
    background: #8298ad;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  &:hover {
    &::before {
      background: linear-gradient(
        to bottom,
        #ea543f,
        #eda525,
        #6abd45,
        #3fa4dc
      );
    }
  }
`;

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
  name,
  src,
  role,
}: {
  name: string;
  src: string;
  role: string;
}) {
  return (
    <BoxCard>
      <Image src={src} width="250px" height="250px" />
      <p style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 800 }}>
        {name}
      </p>
      <p style={{ color: "#E0E0E0", fontSize: "15px", fontWeight: 500 }}>
        {role}
      </p>
    </BoxCard>
  );
}
