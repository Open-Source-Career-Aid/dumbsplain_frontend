import { APIURL } from '../config.js';

export default async function getLeaderBoard(mode = 0) {
    const url = `${APIURL}/api/getleaderboard/?type=${mode}`;
    
    try {
        const response = await fetch(url, {
            credentials: 'include',
            crossDomain: true,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        if (typeof Storage !== 'undefined') {
            localStorage.setItem('lastFetched', Date.now());
            localStorage.setItem(`boardType${mode}`, mode);
        }

        return data;
    } catch (error) {
        console.error('Error:', error.message);
        return [];
    }
}
