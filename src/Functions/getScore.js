export default async function getScore() {

    const url = `http://127.0.0.1:8000/api/getdqstreak/`

    const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true })
    const data = await response.json()

    return data
}