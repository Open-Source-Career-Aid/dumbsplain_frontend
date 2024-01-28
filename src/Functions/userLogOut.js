import { APIURL } from "../config";
// logout call to server USING URL
export default async function userLogOut() {
    const url = `${APIURL}/api/logout/`;
    const response = await fetch(url, {
        'credentials': 'include',
        'crossDomain': true,
        'method': 'GET',
        'headers': { 'Content-Type': 'application/json' },
    });
    const resp = await response.json();
    console.log(resp);
    return resp;
}