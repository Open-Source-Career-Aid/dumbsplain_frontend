import { APIURL } from '../config.js'

export default async function getTheme(theme, gamestarted) {

    const url = `${APIURL}/api/gettheme/`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        'credentials': 'include',
        'crossDomain': true,
        body: JSON.stringify({
            theme: theme,
            gamestarted: gamestarted,
        }),
    });
    
    const data = await response.json();

    return data
}