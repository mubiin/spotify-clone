import Head from "next/head";
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

export default Index;
