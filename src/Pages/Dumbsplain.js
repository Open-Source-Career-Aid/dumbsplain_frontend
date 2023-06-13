import React from 'react';
import { useEffect } from "react";
import '../CSS/Dumbsplain.css';
import Header from '../Components/Header';
import Dumbsplainer from '../Components/Dumbsplainer';
import DumbLevel from '../Components/DumbLevel';
import AnswerOptions from '../Components/AnswerOptions';
import PlayOverlay from '../Components/LevelOverlay';
// import Acheivements from '../Components/ScoreModal';
import ReportCard from '../Components/ReportCard';
import getTopic from '../Functions/getTopic';
import getExplanation from '../Functions/getExplanation';
import getQuestion from '../Functions/getQuestion';
import WaitingBox from '../Components/WaitingBox';
import getWaitingtime from '../Functions/getWaitingtime';
import submitAnswer from '../Functions/submitAnswer';
import pseudoGenerator from '../Functions/pseudoGenerator';
import { ReactSVG } from 'react-svg';

function Dumbsplain( { theme , setTheme } ) {

    let placeholder = 'Select your dumbness level for an explanation of Topic.';
    const [explanation, setExplanation] = React.useState('explanation text');
    const [mcq, setMcq] = React.useState('mcq text');
    const [dumbnessLevel, setDumbnessLevel] = React.useState(null);
    const [currentext, setCurrentext] = React.useState('explaination text');
    const [quizme, setQuizme] = React.useState(false);
    const [explanationloaded, setExplanationloaded] = React.useState(false);
    // eslint-disable-next-line
    const [explanationloading, setExplanationloading] = React.useState(false);
    const [explanationrequested, setExplanationrequested] = React.useState(false);
    const [mcqloaded, setMcqloaded] = React.useState(false);
    const [mcqloading, setMcqloading] = React.useState(false);
    const [mcqrequested, setMcqrequested] = React.useState(false);
    const [selectedoption, setSelectedoption] = React.useState(null);
    const [scoreModal, setScoreModal] = React.useState(false);
    const [infoOverlay, setInfoOverlay ] = React.useState(false);
    const [topic, setTopic] = React.useState(null);
    const [special_id, setSpecial_id] = React.useState(0);
    const [waitfortomorrow, setWaitfortomorrow] = React.useState(false);
    const [waitingtime, setWaitingtime] = React.useState(0);
    const [score, setScore] = React.useState(null);
    const [userdq, setUserdq] = React.useState(0);
    const [userstreak, setUserstreak] = React.useState(0);
    const [maxstreak, setMaxstreak] = React.useState(0);
    const [correctoption, setCorrectoption] = React.useState(null);
    const [time, setTime] = React.useState(null)
    const [contentsectionheight, setContentsectionheight] = React.useState('40vh');
    const [dqincreaseddecreasedorremained, setDqincreaseddecreasedorremained] = React.useState(null);
    const [responsesubmitted, setResponsesubmitted] = React.useState(false);

    async function findcurrentTime() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let currentTime = hours + ":" + minutes + ":" + seconds;
        setTime(currentTime);
    }

    useEffect(() => {
        if (dumbnessLevel !== null) {
        setCurrentext(placeholder+'\n\nCareful now, you can only pick one level each play!');
        }
    // eslint-disable-next-line
    }, [dumbnessLevel]);

    useEffect(() => {

        const windowheight = window.innerHeight;
        const headerheight = document.querySelector('.headersection').offsetHeight;
        const interactionheight = document.querySelector('.interactionsection').offsetHeight;

        console.log('windowheight: ', windowheight,
            'headerheight: ', headerheight,
            'interactionheight: ', interactionheight);

        let contentsectionheighttemp = windowheight - headerheight - interactionheight - 60;
        contentsectionheighttemp = contentsectionheighttemp + 'px';
        console.log('contentsectionheighttemp: ', contentsectionheighttemp);
        setContentsectionheight(contentsectionheighttemp);

    }, []);


    useEffect(() => {
        
        findcurrentTime();
        setCurrentext(placeholder);
        setDumbnessLevel(null);
        setQuizme(false);
        setExplanationloaded(false);
        setExplanationloading(false);
        setExplanationrequested(false);
        setMcqloaded(false);
        setMcqloading(false);
        setMcqrequested(false);
        setSelectedoption(null);
        async function fetchTopic() {
            const topic = await getTopic();
            setTopic(topic.topic);
            setSpecial_id(topic.special_id);
        }
        fetchTopic();
    
    // eslint-disable-next-line
    }, []);

    useEffect(() => {

        // if the time is between 7pm and 6am, set the theme to dark
        if (time !== null) {
            let timeArray = time.split(':');
            let hours = parseInt(timeArray[0]);
            if (hours >= 19 || hours < 6) {
                setTheme('dark');
            }
            else {
                setTheme('light');
            }
        }
    // eslint-disable-next-line
    }, [time]);

    // if esc is pressed and the score modal is open, close the score modal
    useEffect(() => {
        const escFunction = (event) => {

            if (event.keyCode === 27) {
                setScoreModal(false);
            }
        }
        window.addEventListener('keydown', escFunction);
        return () => {
            window.removeEventListener('keydown', escFunction);
        }
    }, [scoreModal]);

    // if esc is pressed and the info overlay is open, close the info overlay
    useEffect(() => {
        const escFunction = (event) => {

            if (event.keyCode === 27) {
                setInfoOverlay(false);
            }
        }
        window.addEventListener('keydown', escFunction);
        return () => {
            window.removeEventListener('keydown', escFunction);
        }
    }, [infoOverlay]);

    // if dumbness level is selected, get the explanation if enter is pressed
    useEffect(() => {
        const enterFunction = (event) => {

            if (event.keyCode === 13) {
                if (dumbnessLevel !== null && explanationloaded === false && quizme === false) {
                    event.preventDefault();
                    // mimic the pressing of the dumbsplain button by calling the handleDumbsplain function
                    handleDumbsplain(event);
                }
            }
        }
        window.addEventListener('keydown', enterFunction);
        return () => {
            window.removeEventListener('keydown', enterFunction);
        }

    // eslint-disable-next-line
    }, [dumbnessLevel]);

    // if explanationloaded is true and quizme is false, get the mcq if enter is pressed
    useEffect(() => {

        const enterFunction = (event) => {

            if (event.keyCode === 13) {
                if (explanationloaded === true && quizme === false) {
                    event.preventDefault();
                    // mimic the pressing of the quiz me button by calling the handleQuizme function
                    handleQuizme(event);
                }
            }
        }
        window.addEventListener('keydown', enterFunction);
        return () => {
            window.removeEventListener('keydown', enterFunction);
        }

    // eslint-disable-next-line
    }, [explanationloaded]);

    // if explanationloaded is false, set the dumbness level on the press of 1, 2, 3, 4, 5 keys respectively
    useEffect(() => {

        const keyFunction = (event) => {

            if (explanationloaded === false && !waitfortomorrow) {
                if (event.keyCode === 49) {
                    event.preventDefault();
                    setDumbnessLevel(1);
                }
                else if (event.keyCode === 50) {
                    event.preventDefault();
                    setDumbnessLevel(2);
                }
                else if (event.keyCode === 51) {
                    event.preventDefault();
                    setDumbnessLevel(3);
                }
                else if (event.keyCode === 52) {
                    event.preventDefault();
                    setDumbnessLevel(4);
                }
                else if (event.keyCode === 53) {
                    event.preventDefault();
                    setDumbnessLevel(5);
                }
            }
        }
        window.addEventListener('keydown', keyFunction);
        return () => {
            window.removeEventListener('keydown', keyFunction);
        }

    // eslint-disable-next-line
    }, [explanationloaded, waitfortomorrow]);

    // if the explanation is loaded quizme is true, and the mcq is loaded, set the selected option on the press of A, B, C, D, or E respectively
    useEffect(() => {

        const keyFunction = (event) => {

            if (!responsesubmitted && !waitfortomorrow && explanationloaded === true && quizme === true && mcqloaded === true) {
                console.log('somethings happening');
                if (event.keyCode === 49) {
                    event.preventDefault();
                    setSelectedoption(1);
                }
                else if (event.keyCode === 50) {
                    event.preventDefault();
                    setSelectedoption(2);
                }
                else if (event.keyCode === 51) {
                    event.preventDefault();
                    setSelectedoption(3);
                }
                else if (event.keyCode === 52) {
                    event.preventDefault();
                    setSelectedoption(4);
                }
                else if (event.keyCode === 53) {
                    event.preventDefault();
                    setSelectedoption(5);
                }
            }
        }
        window.addEventListener('keydown', keyFunction);
        return () => {
            window.removeEventListener('keydown', keyFunction);
        }

    // eslint-disable-next-line
    }, [responsesubmitted, waitfortomorrow, explanationloaded, quizme, mcqloaded]);

    useEffect(() => {

        if (waitfortomorrow === true) {
            async function fetchWaitingtime() {
                const waitingtime = await getWaitingtime();
                setWaitingtime(waitingtime.waitingtime);
                setSpecial_id(waitingtime.special_id);
            }
            fetchWaitingtime();
        }

    }, [waitfortomorrow]);

    useEffect(() => {

        // if special id is 4, refresh the page
        if (special_id === 4) {
            window.location.reload();
        }
        // if special id is 2, set waiting to true
        else if (special_id === 2) {
            setWaitfortomorrow(true);
            setDumbnessLevel(null);
            setQuizme(false);
            setExplanationloaded(false);
            setExplanationloading(false);
            setExplanationrequested(false);
            setMcqloaded(false);
            setMcqloading(false);
            setMcqrequested(false);
            setSelectedoption(null);
        }
        // if special id is 1, get the question and direct to thr quiz
        else if (special_id === 1) {
            setQuizme(true);
            setMcqrequested(true);
            setMcqloading(true);
            async function fetchQuestion() {
                const mcq = await getQuestion();
                setMcq(mcq.question);
                setSpecial_id(mcq.special_id);
            }
            fetchQuestion();
            setMcqloading(false);
            setMcqloaded(true);
        }

    }, [special_id]);

    const handleDumbsplain = (e) => {
        // navigator.vibrate(1000);
        if (dumbnessLevel !== null) {
            e.preventDefault();
            setExplanationrequested(true);
            setExplanationloading(true);
            async function fetchExplanation() {
                const explanation = await getExplanation(dumbnessLevel);
                // setExplanation(explanation.explanation);
                pseudoGenerator(explanation.explanation, setExplanation, 0.06, setExplanationloading);
                setSpecial_id(explanation.special_id);
            }
            fetchExplanation();
            // setExplanationloading(false);
            setExplanationloaded(true);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line
        if (explanationloaded == true) {
            setCurrentext(explanation);
        }
        // eslint-disable-next-line
    }, [explanation]);

    const handleQuizme = (e) => {
        if (explanationloaded === true) {
            e.preventDefault();
            setQuizme(true);
            setMcqrequested(true);
            setMcqloading(true);
            async function fetchQuestion() {
                const mcq = await getQuestion();
                pseudoGenerator(mcq.question, setMcq, 0.06, setMcqloading);
                // setMcq(mcq.question);
                setSpecial_id(mcq.special_id);
            }
            fetchQuestion();
            // setMcqloading(false);
            setMcqloaded(true);
        }
    }

    useEffect(() => {
        if (mcqloaded === true) {
            setCurrentext(mcq);
        }
        
    // eslint-disable-next-line
    }, [mcq]);

    const handleOverlay = (e) => {
        e.preventDefault();
        switch(e.target.dataset.overlay) {
            case "info": infoOverlay ? setInfoOverlay(false) : setInfoOverlay(true);
            break;
            case "score": scoreModal ? setScoreModal(false) : setScoreModal(true);
            break;
            default: console.log(e.target,"");
        }
    }

    const handleTheme = (e) => {
        e.preventDefault();
        if (theme === 'light') {
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    }

    const handleAnswersubmit = (e) => {
        if (selectedoption !== null) {
            e.preventDefault();
            async function fetchAnswer() {
                const answer = await submitAnswer(selectedoption);
                setCorrectoption(answer.correctoption);
                setSpecial_id(answer.special_id);
                setScore(answer.score);
            }
            fetchAnswer();
            setResponsesubmitted(true);
        }
    }

    return (
        <div style={{
            height: '100%',
            width: '100%',
            padding: '0',
            paddingTop: '1%',
            minheight: '500px',
        }}>
            <PlayOverlay infoOverlay={infoOverlay} setInfoOverlay={setInfoOverlay} theme={theme} />
            <ReportCard
            scoreModal={scoreModal}
            setScoreModal={setScoreModal}
            userdq={userdq}
            setUserdq={setUserdq}
            userstreak={userstreak}
            setUserstreak={setUserstreak}
            setSpecial_id={setSpecial_id}
            theme={theme}
            maxstreak={maxstreak}
            setMaxstreak={setMaxstreak}
            mcqrequested={mcqrequested}
            dqincreaseddecreasedorremained={dqincreaseddecreasedorremained}
            setDqincreaseddecreasedorremained={setDqincreaseddecreasedorremained}
            responsesubmitted={responsesubmitted}
            />
            <section className='headersection'
            style={{
                height: 'auto',
            }}
            >
                <div className='navbar'>
                    <div className='dumbsplainlogo'></div>
                    <div className='utilitybuttons'>
                        { theme==='light' ?
                        // <svg className='lightmode' onClick={handleTheme}></svg>
                        <ReactSVG className='lightmode' onClick={handleTheme} src='../../public/lightmode.svg' />
                        : <svg className='darkmode' onClick={handleTheme}></svg>}
                        <svg className='infobutton' onClick={handleOverlay} data-overlay="info"></svg>
                        <svg className='leaderboard' onClick={handleOverlay} data-overlay="score"></svg>
                    </div>
                </div>
                <div className='introduction'>
                    <Header
                    topic={topic}
                    theme={theme}
                    />
                </div>
            </section>
            <div className='dumbsplainbody'>
                <section className='contentsection'
                style={{
                    height: `${contentsectionheight}`,
                    maxHeight: '45vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0',
                }}
                >
                    { waitfortomorrow ? <>
                    <WaitingBox
                        waitingtime={waitingtime}
                        theme={theme}
                        />
                    </> :<>
                    <div className='dumbsplain'>
                        <Dumbsplainer
                        text={currentext}
                        quizme={quizme}
                        theme={theme}
                        />
                    </div>
                    </>
                    }
                </section>

                <section className='interactionsection'
                style={{
                    height: 'auto',
                    marginTop: '0.625em',
                    marginBottom: '0.625em',
                    position: 'relative',
                }}
                >
                    <div className='optionscontainer'>
                        { !quizme ? 
                        <div className='dumbnesslevelscontainer'>
                            <DumbLevel
                            dumbnessLevel={dumbnessLevel}
                            setDumbnessLevel={setDumbnessLevel}
                            explanationrequested={explanationrequested}
                            waitfortomorrow={waitfortomorrow}
                            theme={theme}
                            />
                        </div>
                        :
                        <>
                        { !mcqloading ? <div className='answeroptionscontainer'>
                            <AnswerOptions
                            selectedoption={selectedoption}
                            setSelectedoption={setSelectedoption}
                            mcqrequested={mcqrequested}
                            mcqloading={mcqloading}
                            mcqloaded={mcqloaded}
                            setSpecial_id={setSpecial_id}
                            score={score}
                            setScore={setScore}
                            theme={theme}
                            correctoption={correctoption}
                            />
                        </div> : null}
                        </>
                        }
                    </div>

                    { explanationloaded ?
                        <>
                        { !quizme ?
                        <div className='buttoncontainer'>
                            <div className='dumbsplainbutton' onClick={handleQuizme}>
                                <div className='dumbsplainbuttontext'>Challenge me, AI!</div>
                            </div>
                        </div>
                        : null }
                        </>
                    :
                    <>
                    { dumbnessLevel !== null ?
                    <div className='buttoncontainer'>
                        <div className='dumbsplainbutton' onClick={handleDumbsplain}>
                            <div className='dumbsplainbuttontext'>Dumbsplain</div>
                        </div>
                    </div> 
                    : null }
                    </>}
                    { selectedoption !== null && correctoption == null ?
                    <div className='buttoncontainer'>
                        <div className='dumbsplainbutton' onClick={handleAnswersubmit}>
                            <div className='dumbsplainbuttontext'>Submit</div>
                        </div>
                    </div>
                    : null}
                </section>
            </div>
        </div>
    );
    }

export default Dumbsplain;