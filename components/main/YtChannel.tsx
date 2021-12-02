import styled from "@emotion/styled";

const ArtStepsButton = styled.button`
  height: 50px;
  width: 100%;
  position: relative;

  background: linear-gradient(
        to top,
        rgba(111, 121, 138, 1),
        rgba(255, 255, 255, 0.5)
      )
      padding-box,
    linear-gradient(to right, #ea543f, #eda525, #6abd45, #3fa4dc) border-box;
  background-size: 200% 200%;

  border-radius: 20em;
  border: 2px solid transparent;
  padding: 10px 20px;

  font-family: "outfitFont";
  font-size: 16px;
  color: #edf4ff;

  margin-top: 20px;

  cursor: pointer;

  transition: 0.3s;
  &:active {
    background: linear-gradient(
          to bottom,
          rgba(111, 121, 138, 0.8),
          rgba(111, 121, 138, 0)
        )
        padding-box,
      linear-gradient(to right, #ea543f, #eda525, #6abd45, #3fa4dc) border-box;
  }
  animation: mymove 5s ease infinite;
  animation-fill-mode: forwards;

  @keyframes mymove {
    0% {
      background-position: 10% 0%;
    }
    50% {
      background-position: 91% 100%;
    }
    100% {
      background-position: 10% 0%;
    }
  }
`;

export default function YtChannel() {
  return (
    <a
      href="https://www.artsteps.com/view/619b945a0c36dacf00e9efcd/?currentUser"
      target="_blank"
      rel="noreferrer"
    >
      {" "}
      <ArtStepsButton>Virtual Exhibition</ArtStepsButton>
    </a>
  );
}
