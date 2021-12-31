import { atom, RecoilState } from "recoil";

export const playlistIdState = atom<string | null>({
  key: "playlistIdAtom",
  default: null,
});

export const playlistState: RecoilState<SpotifyApi.SinglePlaylistResponse> =
  atom({
    key: "playlistAtom",
    default: null,
  });
