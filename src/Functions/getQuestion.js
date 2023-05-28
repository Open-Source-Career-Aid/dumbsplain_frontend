export default async function getExplanation(dumbnessLevel) {

    const url = `http://127.0.0.1:8000/api/getquestion/`

    const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true })
    const data = await response.json();

    return data
}