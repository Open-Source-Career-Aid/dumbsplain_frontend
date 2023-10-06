// this page is displayed when the user tries to access a page that does not exist

import { Link } from "react-router-dom";

// or when an error occurs in the app
export default function DumbsplainError() {
    return (
        <div className="error">
            <div style={{textAlign: 'center'}}>
                
                <h1>Oops 404 Page not found!</h1>
                <p>Sorry, but the page you are looking for does not exist.
                <br />
                Please try again or <Link to="/"> go to homepage</Link> to start over.
                </p>
            </div>
        </div>
    );
}   