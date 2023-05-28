export default async function getExplanation(dumbnessLevel) {

    const url = `http://127.0.0.1:8000/api/getexplanation/`

    // post request
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