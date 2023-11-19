import APIURL from '../helpers/environment';
// login call to server
export default async function userLogin(username, password){
    const url = `${APIURL}/api/login/`;
    const response = await fetch(url, {
        'credentials': 'include',
        'crossDomain': true,
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({ 'username': username, 'password': password })
    });
    const resp = await response.json();
    console.log(resp);
    return resp;
}