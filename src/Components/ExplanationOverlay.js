import { useState, useEffect } from 'react';
import '../CSS/ExplanationOverlay.css';
import getExplanation from '../Functions/getExplanation';
import pseudoGenerator from '../Functions/pseudoGenerator';

export default function ExplanationOverlay({ dumbnessLevel, explanationrequested, setExplanationrequested , theme , setScore , setUserdq , setSub }) {

    const [timeremaining, setTimeremaining] = useState(10);
    const [explanation, setExplanation] = useState("");
    // eslint-disable-next-line
    const [explanationloading, setExplanationloading] = useState(true);
    const [bufferscore, setBufferscore] = useState(null);
    const [bufferdq, setBufferdq] = useState(null);
    const [cardscale, setCardscale] = useState(1);

    const handleWindowResize = () => {

        if (window.innerHeight < 620) {
            let temp = window.innerHeight / 620;
            setCardscale(temp);
            return;
        }

        // console.log('Width:', window.innerWidth, 'Height:', window.innerHeight);
        if (window.innerWidth < 675 && window.innerWidth > 600) {
            let temp = 0.8; // tolerance
            setCardscale(temp);
        } 
        else if (window.innerWidth < 420 && window.innerWidth > 300) {
            let temp = (window.innerWidth - 20) / 420; // tolerance
            setCardscale(temp);
        }
        else if (window.innerWidth < 300) {
            let temp = 0.7; // tolerance
            setCardscale(temp);
        }
        else {
            let temp = 1; // tolerance
            setCardscale(temp);
        }

    };

    useEffect(() => {

        window.addEventListener('resize', handleWindowResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, []);

    useEffect(() => {
        handleWindowResize();
    }, [explanationrequested]);

    useEffect(() => {
        async function fetchExplanation() {
            const explanation = await getExplanation(dumbnessLevel);
            // setExplanation(explanation.explanation);
            // setScore(explanation.score);
            setBufferscore(explanation.score);
            // setUserdq(explanation.dq);
            setBufferdq(explanation.dq);
            pseudoGenerator(explanation.explanation, setExplanation, 0.02, setExplanationloading);
        }
        if (explanationrequested) {
            fetchExplanation();
        }
        else {
            setTimeremaining(10);
            setExplanation("");
        }

    }, [explanationrequested, dumbnessLevel, setScore, setUserdq]);

    useEffect(() => {
        if (explanationrequested && timeremaining >= 0) {
            const timer = setInterval(() => {
                setTimeremaining(timeremaining - 1);
            }, 1000);
            return () => clearInterval(timer);
        }

        if (explanationrequested===false && bufferscore!==null) {
            setSub(-0.5)
            setScore(bufferscore);
            setBufferscore(null);
        }

        if (explanationrequested===false && bufferdq!==null) {
            setUserdq(bufferdq);
            setBufferdq(null);
        }

    }, [explanationrequested, timeremaining, setScore, bufferscore, setUserdq, bufferdq, setSub]);

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
            <div className={ explanationrequested ? "modal-overlay" : "modal-overlay-off"} onClick={handleScoreOverlayClick}>
                <main className="explanation-content"
                style={{
                    transform: `scale(${cardscale})`,
                }}
                data-theme={theme}>
                    <div className="explanation-content-header"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                    >
                        <p className="warning" data-theme={theme}>Time to read: <span className="countdown-timer">{timeremaining}</span></p>
                        <div className='closeOverlay explanationoverlay' onClick={closeOverlay}
                        style={{
                            cursor: "pointer",
                        }}
                        data-theme={theme}>&times;</div>
                    </div>
                    <div className="explanation-content-body"
                    style={{
                        padding: "0",
                    }}
                    data-theme={theme}>
                        <div className="explanation-text">
                            <p className='explanation-text-p' data-theme={theme}>{explanation}</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}