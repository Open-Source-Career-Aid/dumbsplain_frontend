import { APIURL } from '../config.js'

export default async function getLeaderBoard() {

    const url = `${APIURL}/api/getleaderboard/`

    const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true });
    const data = await response.json();
    // const content = new Map([['data', data], ['timeStamp', Date.now()]]);
    localStorage.setItem('lastFetched', Date.now());
    return data;
}