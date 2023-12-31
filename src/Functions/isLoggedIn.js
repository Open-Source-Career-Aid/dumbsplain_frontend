import { APIURL } from "../config";

export default async function isLoggedIn() {
    const url = `${APIURL}/api/isloggedin`;
    try {
        const response = await fetch(url, {
        credentials: "include",
        crossDomain: true,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        });
        if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error.message);
        return [];
    }
    }