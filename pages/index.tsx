import type { NextPage } from "next";
import Head from "next/head";
import Layout from "components/Layout/index";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>TechnoNatura Art Exhibition Reservation Form</title>
        <meta
          name="description"
          content="Reservation Form for TechnoNatura Art Exhibition 2021"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
    </>
  );
};

export default Home;
