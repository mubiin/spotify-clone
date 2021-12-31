import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlist";
import { currentTrackIdState, isPlayingState } from "../atoms/song";
import useSpotify from "../hooks/useSpotify";
import { msToDuration } from "../utils/msToDuration";

interface SongProps {
  track: SpotifyApi.TrackObjectFull;
  order: number;
}

function Song({ track, order }: SongProps) {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const playlistId = useRecoilValue(playlistIdState);
  const spotifyApi = useSpotify();

  async function playSong() {
    try {
      await spotifyApi.play({
        context_uri: `spotify:playlist:${playlistId}`,
        offset: { uri: track.uri },
      });
      setCurrentTrackId(track.id);
      setIsPlaying(true);
    } catch (err) {}
  }

  return (
    <div
      className={`grid grid-cols-2 text-gray-500 py-4 px-5 cursor-pointer hover:bg-gray-900 ${
        currentTrackId === track.id ? "bg-gray-800" : ""
      } rounder-lg`}
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img src={track?.album?.images?.[0]?.url} className="w-10 h-10" />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track?.name}</p>
          <p className="w-40 flex-wrap">{track?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className="flex items-center ml-auto md:ml-0 justify-between">
        <p className="hidden md:inline w-40">{track?.album?.name}</p>
        <p>{msToDuration(track?.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
