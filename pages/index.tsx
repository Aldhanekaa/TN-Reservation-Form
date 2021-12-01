import type { NextPage } from "next";
import Head from "next/head";
import Layout from "components/Layout/index";
import { getCookie } from "cookies-next";
import getReservation from "utils/getReservation";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <NextSeo
          title="TechnoNatura Art Exhibition Live Event | Login"
          description="Tonton Acara Art Exhibition yang Diselenggrakan TechnoNatura melalui link ini!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </>
  );
};

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const id = getCookie("id", { req, res });

  // @ts-ignore
  const reservation = await getReservation(id);

  if (reservation.item) {
    return {
      redirect: {
        permanent: false,
        destination: "/live",
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
