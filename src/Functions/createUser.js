import APIURL from '../helpers/environment.js';
// create a user function that sends a username, password, and email to the server
export default async function createUser(username, password, email) {
    const url = `${APIURL}/api/signup/`;
    const response = await fetch(url, {
        'credentials': 'include',
        'crossDomain': true,
        'method': 'POST',
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({ 'username': username, 'password': password, 'email': email })
    });
    const resp = await response.json();
    console.log(resp);
    return resp;
}
