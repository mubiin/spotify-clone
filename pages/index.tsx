import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";

const Index = () => (
  <div className="bg-black h-screen overflow-hidden">
    <Head>
      <title>Spotify Clone</title>
    </Head>
    <main className="flex">
      <Sidebar />
      <Center />
    </main>

    <div>{/* Player */}</div>
  </div>
);

export default Index;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
