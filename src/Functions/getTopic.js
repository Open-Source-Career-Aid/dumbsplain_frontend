// fetch the topic from the api url and return it

import { APIURL } from '../config.js'

export default async function getTopic() {

    const url = `${APIURL}/api/gettopicname/`

    // const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true })
    // const data = await response.json()

    try {
        const response = await fetch(url, { 'credentials': 'include', 'crossDomain': true })
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log(error);
        return null;
    }

    // return data
}