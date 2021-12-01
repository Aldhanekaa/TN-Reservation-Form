import type { NextPage } from "next";
import Head from "next/head";
import Layout from "components/Layout/index";
import { getCookie } from "cookies-next";
import getReservation from "utils/getReservation";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, CircularProgress, Box } from "@mui/material";

const Home: NextPage = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  async function p() {
    const id = getCookie("id");
    console.log(id);
    // @ts-ignore
    const reservation = await getReservation(id);
    if (reservation.item) {
      router.push("/live");
    }

    setLoaded(true);
  }

  useEffect(() => {
    p();
  }, []);

  if (!loaded) {
    return (
      <>
        <Head>
          <NextSeo
            title="TechnoNatura Art Exhibition Live Event | Login"
            description="Tonton Acara Art Exhibition yang Diselenggrakan TechnoNatura melalui link ini!"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CircularProgress /> <h3 style={{ marginLeft: 10 }}>Loading..</h3>
          </Box>
        </Container>
      </>
    );
  }

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

// // @ts-ignore
// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const id = getCookie("id", { req, res });

//   // @ts-ignore
//   const reservation = await getReservation(id);

//   if (reservation.item) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/live",
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default Home;
