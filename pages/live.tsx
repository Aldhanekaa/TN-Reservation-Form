import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetServerSideProps } from "next";
import Navbar from "components/main/navbar/index";
import Footer from "components/main/footer";
import MainWrapper from "components/main/mainWrapper";
// import Speakers from "components/main/speakers";

import getReservation from "utils/getReservation";
import { getCookie, getCookies } from "cookies-next";
import socket from "socket/index";

import { NextSeo } from "next-seo";

export default function LiveEventPage(props: any) {
  socket.connect();
  socket.emit("setSelf", props);
  console.log(socket);
  console.log(props);

  return (
    <>
      <NextSeo
        title="TechnoNatura Art Exhibition Live Event"
        description="Tempat Kumpul Acara Art Exhibition yang Diselenggrakan TechnoNatura."
      />
      <Navbar />
      <MainWrapper />
      {/* <Speakers /> */}
      <Footer />
    </>
  );
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = getCookies({ req, res });
  const id = getCookie("id", { req, res });
  const statusPengunjung = String(getCookie("statusVisitor", { req, res }));
  const namaPengunjung = String(getCookie("namaPengunjung", { req, res }));

  if (statusPengunjung == "") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  if (statusPengunjung == "Siswa" && id == "") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  if (statusPengunjung == "Siswa" && id != "") {
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
      props: reservation.item,
    };
  }

  if (
    ["Orang Tua", "Mentor", "Lainnya", "Saudara"].includes(statusPengunjung) &&
    namaPengunjung != ""
  ) {
    return {
      props: cookies,
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: "/",
    },
  };
};
