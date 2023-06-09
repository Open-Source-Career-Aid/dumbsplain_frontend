import React from 'react';
import { useEffect } from "react";
import '../CSS/Dumbsplain.css';
import Dumbsplainer from '../Components/Dumbsplainer';
import DumbLevel from '../Components/DumbLevel';
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
import ExplanationOverlay from '../Components/ExplanationOverlay';
import Header from '../Components/Header';

function Dumbsplain( { theme , setTheme } ) {

    // let placeholder = "Another day, another opportunity for me to challenge a human. Let’s see how close you get to my intellectual prowess today.\n\nHit ‘Dumbsplain’ if you’re ready for me.";
    const [explanation, setExplanation] = React.useState('explanation text');
    const [mcq, setMcq] = React.useState('mcq text');
    const [dumbnessLevel, setDumbnessLevel] = React.useState(1);
    const [currentext, setCurrentext] = React.useState('explaination text');
    // eslint-disable-next-line
    const [bufferText, setBufferText] = React.useState('buffer text');
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
    const [topicurl, setTopicurl] = React.useState(null);
    const [special_id, setSpecial_id] = React.useState(0);
    const [waitfortomorrow, setWaitfortomorrow] = React.useState(false);
    const [waitingtime, setWaitingtime] = React.useState(0);
    // eslint-disable-next-line
    const [score, setScore] = React.useState(null);
    const [userdq, setUserdq] = React.useState(0);
    const [userstreak, setUserstreak] = React.useState(0);
    const [maxstreak, setMaxstreak] = React.useState(0);
    const [correctoption, setCorrectoption] = React.useState(null);
    const [time, setTime] = React.useState(null)
    const [contentsectionheight, setContentsectionheight] = React.useState('40vh');
    const [dqincreaseddecreasedorremained, setDqincreaseddecreasedorremained] = React.useState(null);
    const [responsesubmitted, setResponsesubmitted] = React.useState(false);
    const [newuser, setNewuser] = React.useState(0);
    // wherever newandupdatedApp is used, it is used to make modifications and differentiate between the old and new app
    const [newandupdatedApp, setNewandupdatedApp] = React.useState(true);
    const [gameended, setGameended] = React.useState(false);
    const [explanationread, setExplanationread] = React.useState(false);
    // eslint-disable-next-line
    const [typing , setTyping] = React.useState(false);

    async function findcurrentTime() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let currentTime = hours + ":" + minutes + ":" + seconds;
        setTime(currentTime);
    }

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
        // setCurrentext(placeholder);
        setDumbnessLevel(1);
        setQuizme(false);
        setExplanationloaded(false);
        setExplanationloading(false);
        setExplanationrequested(false);
        setMcqloaded(false);
        setMcqloading(false);
        setMcqrequested(false);
        setSelectedoption(null);
        setNewandupdatedApp(true);
        async function fetchTopic() {
            const topic = await getTopic();
            setTopic(topic.topic);
            setTopicurl(topic.url);
            setSpecial_id(topic.special_id);
            setNewuser(topic.newuser);
            setDumbnessLevel(topic.dumblevel);
            pseudoGenerator(topic.message, setCurrentext, 0.1);
        }
        fetchTopic();
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (newuser === 1) {
            setInfoOverlay(true);
        }
    }, [newuser]);

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

        console.log('dumbnessLevel: ', dumbnessLevel);
        
        const enterFunction = (event) => {

            if (event.keyCode === 13) {
                if (dumbnessLevel !== null && explanationloaded === false && quizme === false) {
                    event.preventDefault();
                    // mimic the pressing of the dumbsplain button by calling the handleDumbsplain function
                    handleSteppedDumbsplain(event);
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
    // useEffect(() => {

    //     const keyFunction = (event) => {

    //         if (explanationloaded === false && !waitfortomorrow & !newandupdatedApp) {
    //             if (event.keyCode === 49) {
    //                 event.preventDefault();
    //                 setDumbnessLevel(1);
    //             }
    //             else if (event.keyCode === 50) {
    //                 event.preventDefault();
    //                 setDumbnessLevel(2);
    //             }
    //             else if (event.keyCode === 51) {
    //                 event.preventDefault();
    //                 setDumbnessLevel(3);
    //             }
    //             else if (event.keyCode === 52) {
    //                 event.preventDefault();
    //                 setDumbnessLevel(4);
    //             }
    //             else if (event.keyCode === 53) {
    //                 event.preventDefault();
    //                 setDumbnessLevel(5);
    //             }
    //         }
    //     }
    //     window.addEventListener('keydown', keyFunction);
    //     return () => {
    //         window.removeEventListener('keydown', keyFunction);
    //     }

    // // eslint-disable-next-line
    // }, [explanationloaded, waitfortomorrow]);

    // if the explanation is loaded quizme is true, and the mcq is loaded, set the selected option on the press of A, B, C, D, or E respectively
    useEffect(() => {

        const keyFunction = (event) => {

            if (!responsesubmitted && !waitfortomorrow && quizme === true && mcqloaded === true) {
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
            setGameended(true);
        }
        // if special id is 1, get the question and direct to the quiz
        else if (special_id === 1) {
            setQuizme(true);
            setMcqrequested(true);
            setMcqloading(true);
            async function fetchQuestion() {
                const mcq = await getQuestion(dumbnessLevel);
                setMcq(mcq.question);
                setSpecial_id(mcq.special_id);
            }
            fetchQuestion();
            setMcqloading(false);
            setMcqloaded(true);
        }

    // eslint-disable-next-line
    }, [special_id]);

    // eslint-disable-next-line
    const handleDumbsplain = (e) => {
        // navigator.vibrate(1000);
        if (dumbnessLevel !== null) {
            e.preventDefault();
            setExplanationrequested(true);
            setExplanationloading(true);
            async function fetchExplanation() {
                const explanation = await getExplanation(dumbnessLevel);
                // setExplanation(explanation.explanation);
                pseudoGenerator(explanation.explanation, setExplanation, 0.1, setExplanationloading);
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
                const mcq = await getQuestion(dumbnessLevel);
                pseudoGenerator(mcq.question, setMcq, 0.1, setMcqloading);
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
            case "score":
            if (!gameended) {
                break;
            }    
            scoreModal ? setScoreModal(false) : setScoreModal(true);
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
                // pseudoGenerator(answer.message, setCurrentext, 0.1);
                setBufferText(answer.message);
                setCorrectoption(answer.correctoption);
                setSpecial_id(answer.special_id);
                setScore(answer.score);
                setGameended(answer.gameended)
            }
            fetchAnswer();
            setResponsesubmitted(true);
        }
    }

    useEffect(() => {
        
        if (selectedoption === correctoption && responsesubmitted === true) {

            if (dumbnessLevel + 1 <= 5) {
                // this code makes sure that the user gets the next question if they hit the correct option.
                setDumbnessLevel(dumbnessLevel + 1);
                setExplanationloaded(false);
                setExplanationloading(false);
                setExplanationrequested(false);
                setMcqloaded(false);
                setMcqloading(false);
                setMcqrequested(false);
                setResponsesubmitted(false);
                setSelectedoption(1);
                setCorrectoption(null);
                setExplanationread(false);
            }
            else {
                setGameended(true);
                pseudoGenerator(bufferText, setCurrentext, 0.1, setTyping);
                setTimeout(() => {
                    setScoreModal(true);
                }, 8000);
            }
        
        }
        else if (selectedoption !== correctoption && responsesubmitted === true && correctoption !== null) {
            setGameended(true);
            setDumbnessLevel(prev => prev - 1);
            pseudoGenerator(bufferText, setCurrentext, 0.1, setTyping);
            setTimeout(() => {
                setScoreModal(true);
            }, 8000);
        }

        if (correctoption === null && responsesubmitted === false && selectedoption === 1 && mcqloaded === false) {
            setMcqrequested(true);
            setMcqloading(true);
            async function fetchQuestion() {
                const mcq = await getQuestion(dumbnessLevel);
                pseudoGenerator(mcq.question, setMcq, 0.1, setMcqloading);
                // setMcq(mcq.question);
                setSpecial_id(mcq.special_id);
            }
            fetchQuestion();
            // setMcqloading(false);
            setMcqloaded(true);
        }

    // eslint-disable-next-line
    }, [correctoption, responsesubmitted, selectedoption, mcqloaded]);

    const handleSteppedDumbsplain = (e) => {
        e.preventDefault();

        if (responsesubmitted === true) {
            setQuizme(false);
            setExplanationrequested(false);
            setExplanationloading(false);
            setExplanationloaded(false);
            setMcqloaded(false);
            setMcqloading(false);
            setMcqrequested(false);
            setSelectedoption(null);
            setResponsesubmitted(false);
            setCorrectoption(null);
            setExplanationread(false);
        }
        if (dumbnessLevel !== null) {
            setMcqrequested(true);
            setMcqloading(true);
            setQuizme(true);
            async function fetchQuestion() {
                const mcq = await getQuestion(dumbnessLevel);
                pseudoGenerator(mcq.question, setMcq, 0.1, setMcqloading);
                // setMcq(mcq.question);
                setSpecial_id(mcq.special_id);
            }
            fetchQuestion();
            // setMcqloading(false);
            setMcqloaded(true);
        }
    }

    const handleExplanation = (e) => {
        e.preventDefault();
        if (!explanationread) {
            setExplanationrequested(true);
            setExplanationread(true);
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
            <ExplanationOverlay dumbnessLevel={dumbnessLevel} explanationrequested={explanationrequested} setExplanationrequested={setExplanationrequested} theme={theme} />
            <section className='headersection'
            style={{
                height: 'auto',
            }}
            >
                <div className='navbar'>
                    <div className='dumbsplainlogo'></div>
                    <Header
                    theme={theme}
                    />
                    <div className='utilitybuttons'>
                        { theme==='light' ?
                        // <svg className='lightmode' onClick={handleTheme}></svg>
                        <ReactSVG className='lightmode' onClick={handleTheme} src='../../public/lightmode.svg' />
                        : <svg className='darkmode' onClick={handleTheme}></svg>}
                        <svg className='infobutton' onClick={handleOverlay} data-overlay="info"></svg>
                        <svg className={'leaderboard' + ( !gameended ? ' blocked' : '' )}
                        onClick={handleOverlay} data-overlay="score"></svg>
                    </div>
                </div>
                {/* <div className='introduction'>
                    <Header
                    topic={topic}
                    theme={theme}
                    />
                </div> */}
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
                        topic={topic}
                        topicurl={topicurl}
                        responsesubmitted={responsesubmitted}
                        selectedoption={selectedoption}
                        setSelectedoption={setSelectedoption}
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
                        <div className='dumbnesslevelscontainer'>
                            <DumbLevel
                            dumbnessLevel={dumbnessLevel}
                            setDumbnessLevel={setDumbnessLevel}
                            explanationrequested={explanationrequested}
                            waitfortomorrow={waitfortomorrow}
                            theme={theme}
                            newandupdatedApp={newandupdatedApp}
                            />
                        </div>
                    </div>

                    {/* { explanationloaded ?
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
                    : null} */}
                    { !gameended ? <>
                    { dumbnessLevel !== null && !quizme ?
                    <div className='buttoncontainer'>
                        <div className='dumbsplainbutton' onClick={handleSteppedDumbsplain}>
                            <div className='dumbsplainbuttontext'>Dumbsplain</div>
                        </div>
                    </div> 
                    : 
                    <>
                    { quizme && !mcqloading && !responsesubmitted ? <div style={
                        {
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            overflow: 'visible',
                        }
                    } class="submithintbuttons">
                    <div className='buttoncontainer'
                    style={{
                        marginRight: '0.3125em',
                        scale: "1",
                    }}
                    >
                        <div className='dumbsplainbutton' onClick={handleAnswersubmit}>
                            <div className='dumbsplainbuttontext'>Submit</div>
                        </div>
                    </div>
                    <div className='buttoncontainer'
                    style={{
                        marginLeft: '0.3125em',
                        overflow: "visible",
                        scale: '1',
                    }}
                    >
                        <div className='dumbsplainbutton'
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            border: '2px solid #4C7BFE',
                            backgroundColor: 'transparent',
                            position: 'relative',
                            overflow: "visible",
                            borderTopRightRadius: '0',
                        }}
                        onClick={handleExplanation}
                        >
                            <div className='dumbsplainbuttontext takeahint' data-theme={theme}>Take a Hint?</div>
                            <div className='decrement'
                            style={{
                                color: 'white',
                                fontSize: '0.4em',
                                fontWeight: 'bold',
                                padding: '3px 6px',
                                marginLeft: '0.2125em',
                                position: 'absolute',
                                right: '0',
                                top: '0',
                                backgroundColor: '#F69E6C',
                                // height: '25px',
                                // width: '50px',
                                borderRadius: '5px',
                                transform: 'translate(120%, 0)',
                                borderTopLeftRadius: '0',
                                border: '4px solid #F69E6C',
                            }}
                            >-0.5</div>
                        </div>
                    </div> 
                    </div> : <>
                    {/* { responsesubmitted ? 
                    <div className='buttoncontainer'>
                        <div className='dumbsplainbutton' onClick={handleSteppedDumbsplain}>
                            <div className='dumbsplainbuttontext'>Dumbsplain</div>
                        </div>
                    </div> : null} */}
                    </>
                    }
                    </>
                    }
                    </> : null}
                </section>
            </div>
        </div>
    );
    }

export default Dumbsplain;