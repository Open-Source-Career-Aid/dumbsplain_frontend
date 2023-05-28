export default async function getExplanation(selectedoption) {

    const url = `http://127.0.0.1:8000/api/submitanswer/`

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