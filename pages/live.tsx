import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Container } from "@mui/material";
import Navbar from "components/main/navbar/index";
import Footer from "components/main/footer";
import MainSection from "components/main/main";

export default function LiveEventPage() {
  return (
    <>
      <Navbar />
      <MainSection />
      <Footer />
    </>
  );
}
