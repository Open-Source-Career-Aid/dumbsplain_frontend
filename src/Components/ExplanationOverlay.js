import { useState, useEffect } from 'react';
import '../CSS/ExplanationOverlay.css';
import getExplanation from '../Functions/getExplanation';
import pseudoGenerator from '../Functions/pseudoGenerator';

export default function ExplanationOverlay({ dumbnessLevel, explanationrequested, setExplanationrequested , theme }) {

    const [timeremaining, setTimeremaining] = useState(30);
    const [explanation, setExplanation] = useState("");
    // eslint-disable-next-line
    const [explanationloading, setExplanationloading] = useState(true);

    useEffect(() => {
        async function fetchExplanation() {
            const explanation = await getExplanation(dumbnessLevel);
            // setExplanation(explanation.explanation);
            pseudoGenerator(explanation.explanation, setExplanation, 0.02, setExplanationloading);
        }
        if (explanationrequested) {
            fetchExplanation();
        }
    }, [explanationrequested]);

    useEffect(() => {
        if (explanationrequested && timeremaining >= 0) {
            const timer = setInterval(() => {
                setTimeremaining(timeremaining - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [explanationrequested, timeremaining]);

    useEffect(() => {
        if (timeremaining === 0) {
            setExplanation("Trying to be smart, huh? You can't read the explanation anymore!");
            setExplanationrequested(false);
        }
    }, [timeremaining, setExplanationrequested]);

    const handleScoreOverlayClick = (e) => {
        // close overlay when clicked outside, add a listener to the window
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {
            setExplanationrequested(false);
        }
    }

    const closeOverlay = (e) => {
        e.preventDefault();
        setExplanationrequested(false);
    }

    return (
        <>
            <div className={ explanationrequested ? "modal-overlay" : "modal-overlay-off"}>
                <main className="explanation-content" onClick={handleScoreOverlayClick}>
                    <div className="explanation-content-header"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                    >
                        <p className="warning">Time to read: <span className="countdown-timer">{timeremaining}</span></p>
                        <div className='closeOverlay' onClick={closeOverlay}
                        style={{
                            color: "black",
                            cursor: "pointer",
                        }}
                        >&times;</div>
                    </div>
                    <div className="explanation-content-body"
                    style={{
                        padding: "0",
                    }}
                    >
                        <div className="explanation-text">
                            <p className='explanation-text-p'>{explanation}</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}