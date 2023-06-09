import { APIURL } from '../config.js'

export default async function getExplanation(dumbnessLevel) {

    const url = `${APIURL}/api/getquestion/`

    const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true })
    const data = await response.json();

    console.log(data)

    return data
}