import { APIURL } from '../config.js'
export default async function getLeaderBoard(mode=1) {
    const url = `${APIURL}/api/getleaderboard/`;
    const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true, 'method': 'POST', 'headers': { 'Content-Type': 'application/json' }, 'body': JSON.stringify({ 'type': mode })});
    const data = await response.json();
    console.log(data);
    return data;
}