import { atom, RecoilState } from "recoil";

export const currentTrackIdState: RecoilState<string> = atom({
  key: "currentTrackIdState",
  default: null,
});

export const isPlayingState: RecoilState<boolean> = atom({
  key: "isPlayingState",
  default: false,
});
