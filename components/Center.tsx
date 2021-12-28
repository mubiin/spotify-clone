import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import shuffle from "lodash/shuffle";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlist";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

function Center() {
  const [fromColor, setFromColor] =
    useState<typeof fromGradientColors[number]>(null);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const playlistId = useRecoilValue(playlistIdState);
  const spotifyApi = useSpotify();

  const { data: session } = useSession();
  const fromGradientColors = [
    "from-green-500",
    "from-red-500",
    "from-purple-500",
    "from-orange-500",
    "from-yellow-500",
    "from-sky-500",
    "from-pink-500",
    "from-indigo-500",
  ] as const;

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then(({ body: playlist }) => {
        setPlaylist(playlist);
      })
      .catch((error) => {
        console.error(`Error retrieving playlist (id: ${playlistId})`, error);
      })
      .finally(() => setFromColor(shuffle(fromGradientColors)[0]));
  }, [playlistId, spotifyApi]);

  return (
    <div className="grow text-white">
      <header className="absolute top-5 right-7">
        <div className="space-x-2 p-1 pr-2 flex items-center bg-black rounded-full opacity-90 hover:opacity-80 cursor-pointer">
          <img src={session?.user?.image} className="rounded-full w-8 h-8" />
          <p className="text-sm">{session?.user?.name}</p>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-5 bg-gradient-to-b ${fromColor} to-black text-white p-8 h-80`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          className="w-40 h-40 shadow-2xl rounded-lg"
        ></img>
        <div>
          <p className="font-thin tracking-wider">PLAYLIST</p>
          <h2 className="text-2xl font-semibold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h2>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
