// fetch the topic from the api url and return it

export default async function getTopic() {

    const url = `http://127.0.0.1:8000/api/gettopicname/`

    const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true })
    const data = await response.json()

    return data
}