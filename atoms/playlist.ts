import { atom, RecoilState } from "recoil";

export const playlistIdState = atom({
  key: "playlistIdAtom",
  default: "7iuwgBxqj87DfmdukASlYO",
});

export const playlistState: RecoilState<SpotifyApi.SinglePlaylistResponse> =
  atom({
    key: "playlistAtom",
    default: null,
  });
