import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlist";
import Song from "./Song";

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="text-white flex flex-col px-8 space-y-1 pb-28 text-xs md:text-sm">
      {playlist?.tracks?.items?.map(({ track }, index) => (
        <Song key={track.id} track={track} order={index} />
      ))}
    </div>
  );
}

export default Songs;
