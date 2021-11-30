import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetServerSideProps } from "next";
import Navbar from "components/main/navbar/index";
import Footer from "components/main/footer";
import MainSection from "components/main/main";
import Speakers from "components/main/speakers";

import getReservation from "utils/getReservation";
import { getCookie } from "cookies-next";
import socket from "socket/index";

export default function LiveEventPage() {
  socket.connect();

  return (
    <>
      <Navbar />
      <MainSection />
      <Speakers />
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const id = getCookie("id", { req, res });
  if (!id) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  // @ts-ignore
  const reservation = await getReservation(id);

  if (reservation.status == "error") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};
