import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  MusicNoteIcon,
} from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlist";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [_, setPlaylistId] = useRecoilState(playlistIdState);
  const spotifyApi = useSpotify();

  const buttonStyle = "flex items-center space-x-2 hover:text-white";
  const iconStyle = "h-5 w-5";

  useEffect(() => {
    setUserPlaylists();

    async function setUserPlaylists() {
      const {
        body: { items: playlists },
      } = await spotifyApi.getUserPlaylists();
      setPlaylists(playlists);
    }
  }, [spotifyApi]);

  return (
    <div
      className="text-gray-500 p-5 space-y-4 text-xs lg:text-sm border-r 
    border-gray-900 overflow-y-scroll h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:block"
    >
      {/* Main buttons */}
      <button className={buttonStyle}>
        <HomeIcon className={iconStyle} />
        <p>Home</p>
      </button>
      <button className={buttonStyle}>
        <SearchIcon className={iconStyle} />
        <p>Search</p>
      </button>
      <button className={buttonStyle}>
        <LibraryIcon className={iconStyle} />
        <p>Your Library</p>
      </button>

      <hr className="border-t-[0.1px] border-gray-900" />

      <button className={buttonStyle}>
        <PlusCircleIcon className={iconStyle} />
        <p>Create Playlist</p>
      </button>
      <button className={buttonStyle}>
        <HeartIcon className={iconStyle} />
        <p>Liked Songs</p>
      </button>
      <button className={buttonStyle}>
        <RssIcon className={iconStyle} />
        <p>Your Episodes</p>
      </button>

      <hr className="border-t-[0.1px] border-gray-900" />

      {/* Playlists */}
      {playlists &&
        playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="flex space-x-2 cursor-pointer hover:text-white"
          >
            <div>
              <MusicNoteIcon className={iconStyle} />
            </div>
            <p onClick={() => setPlaylistId(playlist.id)}>{playlist.name}</p>
          </div>
        ))}
    </div>
  );
}

export default Sidebar;
