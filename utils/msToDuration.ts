export function msToDuration(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000).toFixed(0);
  return Number(seconds) === 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}
