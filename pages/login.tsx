import { BuiltInProviderType } from "next-auth/providers";
import {
  getProviders,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
  getSession,
} from "next-auth/react";
import Image from "next/image";
import spotifyLogo from "../public/spotify.png";
interface LoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

function Login({ providers }: LoginProps) {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
        <div>
          <div className="relative h-60 w-60 mb-4">
            <Image
              src={spotifyLogo}
              layout="fill"
              placeholder="blur"
              priority
            />
          </div>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.id}
              className="uppercase font-light tracking-widest p-5 rounded-full text-center bg-green-500 text-white w-full mb-2"
              onClick={() => {
                signIn(provider.id, { callbackUrl: "/" });
              }}
            >
              Login via {provider.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Login;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
