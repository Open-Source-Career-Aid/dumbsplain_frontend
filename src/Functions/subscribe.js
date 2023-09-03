import { APIURL } from '../config.js'

export default async function Subscribe(email) {

    const url = `${APIURL}/api/subscribe/`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include',
        'crossDomain': true,
        body: JSON.stringify({
            email: email,
        }),
    });
    
    const data = await response.json();

    return data
}