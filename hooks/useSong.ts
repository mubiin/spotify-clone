import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/song";
import useSpotify from "./useSpotify";

function useSong() {
  const spotifyApi = useSpotify();
  const [currentTrackId] = useRecoilState(currentTrackIdState);
  const [currentSong, setCurrentSong] =
    useState<SpotifyApi.SingleTrackResponse>(null);

  useEffect(() => {
    if (currentTrackId) {
      spotifyApi.getTrack(currentTrackId).then(({ body: song }) => {
        setCurrentSong(song);
      });
    }
  }, [currentTrackId]);
  return { currentSong };
}

export default useSong;
