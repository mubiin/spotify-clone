import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
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
];

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFYCLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

const AUTHORIZE_URL = spotifyApi.createAuthorizeURL(scopes, "state");

export default spotifyApi;
export { AUTHORIZE_URL };
