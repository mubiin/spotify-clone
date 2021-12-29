import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/song";
import useSong from "../hooks/useSong";
import useSpotify from "../hooks/useSpotify";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const { currentSong } = useSong();

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }

    async function fetchCurrentSong() {
      if (!currentSong) {
        const { body: song } = await spotifyApi.getMyCurrentPlayingTrack();
        setCurrentTrackId(song?.item?.id);
        setIsPlaying(song?.is_playing);
        setVolume(50);
      }
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="grid grid-col-3 text-xs md:text-sm lg:text-base px-2 md:px-8 text-white h-24 bg-gradient-to-b from-black to-gray-900">
      <div className="flex items-center space-x-4">
        <img
          src={currentSong?.album?.images?.[0].url}
          className="w-10 h-10 hidden md:inline"
        />
        <div>
          <h3>{currentSong?.name}</h3>
          <p>{currentSong?.artists?.[0].name}</p>
        </div>
      </div>
    </div>
  );
}

export default Player;
