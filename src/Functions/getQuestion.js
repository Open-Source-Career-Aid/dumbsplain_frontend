import { APIURL } from '../config.js'

export default async function getExplanation(dumbnessLevel) {

    const url = `${APIURL}/api/getquestion/`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include',
        'crossDomain': true,
        body: JSON.stringify({
            level: dumbnessLevel,
        }),
    });
    const data = await response.json();

    return data
}