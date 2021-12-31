import {
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeOffIcon,
  RewindIcon,
  FastForwardIcon,
} from "@heroicons/react/outline";
import { VolumeUpIcon, PauseIcon, PlayIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/song";
import useSong from "../hooks/useSong";
import useSpotify from "../hooks/useSpotify";
import debounce from "lodash/debounce";
import { playlistIdState } from "../atoms/playlist";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<"track" | "context" | "off">("off");
  const [_, setPlaylistId] = useRecoilState(playlistIdState);

  const { currentSong } = useSong();

  useEffect(() => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then(({ body: state }) => {
        if (!state) {
          spotifyApi
            .getUserPlaylists()
            .then(({ body: { items: playlists } }) => {
              setPlaylistId(playlists[0]?.id);
            })
            .catch();
          return;
        }

        setVolume(state.device?.volume_percent || 50);
        setShuffle(state.shuffle_state);
        setRepeat(state.repeat_state);

        if (state.context?.type === "playlist" && state.context?.uri) {
          const splits = state.context.uri.split(":");
          if (splits[2]) {
            setPlaylistId(splits[2]);
          }
        }
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }

    async function fetchCurrentSong() {
      if (!currentSong) {
        const { body: song } = await spotifyApi.getMyCurrentPlayingTrack();
        setCurrentTrackId(song?.item?.id);
        setIsPlaying(song?.is_playing);
      }
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedChangeVolume(volume);
    }
  }, [volume]);

  const debouncedChangeVolume = useCallback(
    debounce((volume) => spotifyApi.setVolume(volume).catch((err) => {}), 600),
    [volume]
  );

  async function handlePlayPause() {
    if (isPlaying) {
      spotifyApi.pause();
      setIsPlaying(false);
    } else {
      spotifyApi.play();
      setIsPlaying(true);
    }
  }

  const handleSetShuffle = useCallback(async () => {
    try {
      await spotifyApi.setShuffle(!shuffle);
      setShuffle(!shuffle);
    } catch (error) {}
  }, [shuffle]);

  async function handlePreviousNext(prevOrNext: "previous" | "next") {
    try {
      prevOrNext === "previous"
        ? await spotifyApi.skipToPrevious()
        : await spotifyApi.skipToNext();
      const { body: song } = await spotifyApi.getMyCurrentPlayingTrack();
      setCurrentTrackId(song?.item?.id);
    } catch (err) {}
  }

  const handleSetRepeat = useCallback(() => {
    try {
      switch (repeat) {
        case "off":
          setRepeat("context");
          spotifyApi.setRepeat("context").catch((err) => {});
          break;
        case "context":
          setRepeat("track");
          spotifyApi.setRepeat("track").catch((err) => {});
          break;
        case "track":
          setRepeat("off");
          spotifyApi.setRepeat("off").catch((err) => {});
          break;
        default:
          return;
      }
    } catch (error) {}
  }, [repeat]);

  return (
    <div
      className="grid grid-cols-3 text-xs md:text-sm lg:text-base px-2 md:px-8 
    text-white h-24 bg-gradient-to-b from-black to-gray-900"
    >
      {/* Left */}
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

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon
          className={`button ${shuffle ? "stroke-green-500" : ""}`}
          onClick={handleSetShuffle}
        />

        <RewindIcon
          className="button"
          onClick={() => handlePreviousNext("previous")}
        />
        {isPlaying ? (
          <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
        )}
        <FastForwardIcon
          className="button"
          onClick={() => handlePreviousNext("next")}
        />
        <div className="relative" onClick={handleSetRepeat}>
          <ReplyIcon
            className={`button ${repeat === "off" ? "" : "stroke-green-500"}`}
          />
          {repeat === "track" && (
            <div
              className="flex justify-center items-center absolute top-2 left-3 text-[0.55rem] 
          text-black bg-green-500 rounded-full px-[0.35rem] lg:px-[0.6rem] w-3 h-3 cursor-pointer select-none"
            >
              1
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-2 justify-end">
        <VolumeOffIcon
          className="button"
          onClick={() => {
            volume > 0 && setVolume(volume - 10);
          }}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => {
            volume < 100 && setVolume(volume + 10);
          }}
        />
      </div>
    </div>
  );
}

export default Player;
