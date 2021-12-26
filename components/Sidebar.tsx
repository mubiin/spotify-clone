import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon
} from "@heroicons/react/outline";

function Sidebar() {
  const buttonStyle = "flex items-center space-x-2 hover:text-white";
  const iconStyle = "h-5 w-5";
  return (
    <div className="text-gray-500 p-5 space-y-4 text-sm border-r-gray-900">
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
    </div>
  );
}

export default Sidebar;
