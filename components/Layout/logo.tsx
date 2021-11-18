import Image from "next/image";
import ExhibitionWhiteLogo from "public/adx2021kidstextonly-white.png";
import { Stack } from "@mui/material";

export default function Logo() {
  return (
    <Stack direction="row" alignItems="center">
      <Image src={ExhibitionWhiteLogo} width={85} height={70}></Image>

      <h1 style={{ fontSize: 15, color: "#fff", marginLeft: 10 }}>
        {" "}
        TechnoNatura Art Exhibition <br /> Reservation Form
      </h1>
    </Stack>
  );
}
