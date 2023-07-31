import { useState, useEffect } from 'react';
import '../CSS/ExplanationOverlay.css';
import getExplanation from '../Functions/getExplanation';
import pseudoGenerator from '../Functions/pseudoGenerator';
import ReactGA4 from 'react-ga4';

export default function ExplanationOverlay({ dumbnessLevel, explanationrequested, setExplanationrequested , theme , setScore , setUserdq , setSub }) {

    const [timeremaining, setTimeremaining] = useState(10);
    const [explanation, setExplanation] = useState("");
    // eslint-disable-next-line
    const [explanationloading, setExplanationloading] = useState(true);
    const [bufferscore, setBufferscore] = useState(null);
    const [bufferdq, setBufferdq] = useState(null);
    const [cardscale, setCardscale] = useState(1);
    const [startTime, setStartTime] = useState(null);
    const [modality, setModality] = useState(null);
    const [link, setLink] = useState(null);

    const handleWindowResize = () => {

        if (window.innerHeight < 620) {
            let temp = window.innerHeight / 620;
            let temp2 = window.innerWidth / 420;
            if (temp2 < temp) {
                temp = temp2;
            }
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
            let temp = (window.innerWidth - 20) / 420; // tolerance
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

        console.log(modality);

    }, [modality]);

    useEffect(() => {
        handleWindowResize();
    }, [explanationrequested]);

    useEffect(() => {
        async function fetchExplanation() {

            setStartTime(new Date().getTime());

            ReactGA4.event({
                category: 'Hint requested for level ' + dumbnessLevel,
                action: 'Explanation requested',
                label: 'Explanation requested',
            });

            const explanation = await getExplanation(dumbnessLevel);
            // setExplanation(explanation.explanation);
            // setScore(explanation.score);
            setBufferscore(explanation.score);
            // setUserdq(explanation.dq);
            setBufferdq(explanation.dq);
            pseudoGenerator(explanation.explanation, setExplanation, 0.02, setExplanationloading);
            setModality(explanation.modality);
            setLink(explanation.explanation);
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

            ReactGA4.event({
                category: 'Hint box closed for level ' + dumbnessLevel,
                action: 'Explanation requested',
                label: 'Explanation requested',
                value: new Date().getTime() - startTime,
            });

            setExplanationrequested(false);
            setModality(null);
        }
    }, [timeremaining, setExplanationrequested, dumbnessLevel, startTime]);

    const handleScoreOverlayClick = (e) => {
        // close overlay when clicked outside, add a listener to the window
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {

            ReactGA4.event({
                category: 'Hint box closed for level ' + dumbnessLevel,
                action: 'Explanation requested',
                label: 'Explanation requested',
                value: new Date().getTime() - startTime,
            });

            setExplanationrequested(false);
            setModality(null);
        }
    }

    const closeOverlay = (e) => {
        e.preventDefault();

        ReactGA4.event({
            category: 'Hint box closed for level ' + dumbnessLevel,
            action: 'Explanation requested',
            label: 'Explanation requested',
            value: new Date().getTime() - startTime,
        });

        setExplanationrequested(false);
    }

    return (
        <>
            <div className={ explanationrequested ? "modal-overlay" : "modal-overlay-off"} onClick={handleScoreOverlayClick}>
                <main className="explanation-content"
                style={{
                    transform: `scale(${cardscale})`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
                data-theme={theme}>
                    <div className="explanation-content-header"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    >
                        <p className="warning" data-theme={theme}>Time to read: <span className="countdown-timer">{timeremaining}</span></p>
                        <div className='closeOverlay explanationoverlay' onClick={closeOverlay}
                        style={{
                            cursor: "pointer",
                        }}
                        data-theme={theme}>&times;</div>
                    </div>
                        { modality==='text' ? <div className="explanation-content-body"
                    style={{
                        padding: "0",
                    }}
                    data-theme={theme}>
                        <div className="explanation-text">
                            <p className='explanation-text-p' data-theme={theme}>{explanation}</p>
                        </div>
                        </div>
                        : modality==='video' ? <div className="explanation-video"
                        style={{
                            overflow: 'hidden',
                            padding: '0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            marginTop: '40px',
                            height: '60%',
                        }}
                        >
                            <video
                        style={{
                            width: '100%',
                            height: 'auto',
                            padding: '0',
                            // display: `${text!=='' ? 'block' : 'none'}`,
                            border: '5px solid grey',
                            overflow: 'visible',
                        }}
                        autoPlay loop muted>
                            <source src={link} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                            </div>
                        : modality==='image' ? <div className="explanation-image">
                            </div>
                        : null}
                </main>
            </div>
        </>
    )
}