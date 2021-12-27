import Head from "next/head";
import { getSession } from "next-auth/react";
import Sidebar from "../components/Sidebar";

const Index = () => (
  <div className="bg-black h-screen overflow-hidden">
    <Head>
      <title>Spotify Clone</title>
    </Head>
    <main>
      <Sidebar />
      {/* Center */}
    </main>

    <div>{/* Player */}</div>
  </div>
);

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default Index;
