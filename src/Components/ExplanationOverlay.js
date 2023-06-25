import { useState, useEffect } from 'react';

export default function ExplanationOverlay({dumbnessLevel, explanationrequested, setExplanationrequested}) {

    const [timeremaining, setTimeremaining] = useState(60);
    const [explanation, setExplanation] = useState("Some explanation about the question will appear here.");

    useEffect(() => {
        if (explanationrequested) {
            const timer = setInterval(() => {
                setTimeremaining(timeremaining - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [explanationrequested, timeremaining]);

    useEffect(() => {
        if (timeremaining === 0) {
            setExplanationrequested(false);
        }
    }, [timeremaining, setExplanationrequested]);

    const handleScoreOverlayClick = (e) => {
        // close overlay when clicked outside, add a listener to the window
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {
            setExplanationrequested(false);
        }
    }

    return (
        <>
            <div className={ explanationrequested ? "modal-overlay" : "modal-overlay-off"}>
                <main className="explanation-content" onClick={handleScoreOverlayClick}>
                    <div className="explanation-content-header">
                        <p className="warning">WARNING</p>
                        <p className="countdown-timer">{timeremaining}</p>
                    </div>
                    <div className="explanation-content-body">
                        <p className="explanation-text">{explanation}</p>
                    </div>
                </main>
            </div>
        </>
    )
}