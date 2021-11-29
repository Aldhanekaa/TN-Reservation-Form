import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from "components/main/navbar/index";
import Footer from "components/main/footer";
import MainSection from "components/main/main";
import Speakers from "components/main/speakers";

export default function LiveEventPage() {
  return (
    <>
      <Navbar />
      <MainSection />
      <Speakers />
      <Footer />
    </>
  );
}
