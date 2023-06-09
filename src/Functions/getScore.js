import { APIURL } from '../config.js'

export default async function getScore() {

    const url = `${APIURL}/api/getdqstreak/`

    const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true })
    const data = await response.json()

    return data
}