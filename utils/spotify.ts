import SpotifyWebApi from "spotify-web-api-node";

const scope = [
  /* Spotify Connect */
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",

  /* Users */
  "user-read-private",
  "user-read-email",

  /* Follow */
  "user-follow-read",

  /* Library */
  "user-library-read",

  /* Playback */
  "streaming",

  /* Listening History */
  "user-top-read",
  "user-read-recently-played",

  /* Playlists */
  "playlist-read-collaborative",
  "playlist-read-private",
].join(",");

function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

const params = {
  scope,
  state: generateRandomString(16),
};

const queryParams = new URLSearchParams(params).toString();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFYCLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const AUTHORIZE_URL = `https://accounts.spotify.com/authorize?${queryParams}`;

export default spotifyApi;
export { AUTHORIZE_URL };
