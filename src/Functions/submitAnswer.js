import { APIURL } from '../config.js'

export default async function submitAnswer(selectedoption) {

    const url = `${APIURL}/api/submitanswer/`

    console.log(selectedoption);

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