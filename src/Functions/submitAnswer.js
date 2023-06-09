import { APIURL } from '../config.js'

export default async function getExplanation(selectedoption) {

    const url = `${APIURL}/api/submitanswer/`

    // post request
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include',
        'crossDomain': true,
        body: JSON.stringify({
            answer: selectedoption,
        }),
    });

    const data = await response.json();

    console.log(data);

    return data
}