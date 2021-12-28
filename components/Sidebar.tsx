import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  MusicNoteIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const buttonStyle = "flex items-center space-x-2 hover:text-white";
  const iconStyle = "h-5 w-5";

  useEffect(() => {
    if (session) {
      setUserPlaylists();
    }

    async function setUserPlaylists() {
      const {
        body: { items: playlists },
      } = await spotifyApi.getUserPlaylists();
      setPlaylists(playlists);
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 space-y-4 text-sm border-r border-gray-900 overflow-y-scroll h-screen">
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
          <button
            key={playlist.id}
            className={buttonStyle}
            onClick={() =>
              spotifyApi
                .getPlaylistTracks(playlist.id)
                .then((data) => console.log(data))
            }
          >
            <MusicNoteIcon className={iconStyle} />
            <p>{playlist.name}</p>
          </button>
        ))}
    </div>
  );
}

export default Sidebar;
