import { APIURL } from "../config";
// logout call to server USING URL
export default async function userLogOut() {
    const url = `${APIURL}/api/logout/`;
    try {
        await fetch(url, {
            'credentials': 'include',
            'crossDomain': true,
            'method': 'GET',
            'headers': { 'Content-Type': 'application/json' },
        });
        // const resp = await response.json();
        // if (response.ok) {
        //     console.log('user logged out');
        // } else {
        //     console.error('Logout failed:', resp);
        // }
        // return resp;
    } catch (error) {
        console.error('Failed to logout:', error);
        return { error: 'Failed to logout' };
    }
}
