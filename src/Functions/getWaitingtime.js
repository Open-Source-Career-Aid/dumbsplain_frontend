import { APIURL } from '../config.js'

export default async function getWaitingtime() {

    const url = `${APIURL}/api/getwaitingtime/`

    const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true })
    const data = await response.json()

    return data
}