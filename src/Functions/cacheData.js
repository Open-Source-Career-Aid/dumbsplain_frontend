// Desc: Function to check if data is stale
export default function checkForStaleData (currTimeStamp, lastFetched) {
  const maxCacheAge = 60 * 60 * 1000;  // 60 minutes in milliseconds
  return maxCacheAge > (currTimeStamp - lastFetched);
}
