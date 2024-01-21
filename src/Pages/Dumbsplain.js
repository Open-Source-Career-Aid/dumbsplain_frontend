import React, { useContext } from 'react';
import { useEffect } from "react";
import '../CSS/Dumbsplain.css';
import Dumbsplainer from '../Components/Dumbsplainer';
import DumbLevel from '../Components/DumbLevel';
import PlayOverlay from '../Components/LevelOverlay';
// import Acheivements from '../Components/ScoreModal';
import ReportCard from '../Components/ReportCard';
import getTopic from '../Functions/getTopic';
import getQuestion from '../Functions/getQuestion';
import WaitingBox from '../Components/WaitingBox';
import getWaitingtime from '../Functions/getWaitingtime';
import submitAnswer from '../Functions/submitAnswer';
import pseudoGenerator from '../Functions/pseudoGenerator';
import { ReactSVG } from 'react-svg';
import ExplanationOverlay from '../Components/ExplanationOverlay';
// import Header from '../Components/Header';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import PlayerProgress from "../Components/PlayerProgress";
import EmojiSlider from "../Components/EmojiSlide";
import ReactGA4 from 'react-ga4';
import TopicOverlay from '../Components/TopicOverlay';
import getTheme from '../Functions/getTheme';
import LeaderBoard from '../Components/LeaderBoard';
import LoginOverlay from '../Components/LoginOverlay';
import LogoutOverlay from '../Components/LogoutOverlay';
import userLogOut from '../Functions/userLogOut';
import UserContext from '../userContext';

function Dumbsplain( { theme , setTheme } ) {
    // useContext to grab user data and creating setUser function for future use
    const { user, setUser } = useContext(UserContext)

    // double checking the user is correct and useContext is working
    React.useEffect(() => {
        console.log(user)
    }, [user]);

    const { width , height } = useWindowSize()
    const [confetti, setConfetti] = React.useState(false);
    const [confettiamount, setConfettiamount] = React.useState(0);
    // let placeholder = "Another day, another opportunity for me to challenge a human. Let’s see how close you get to my intellectual prowess today.\n\nHit ‘Dumbsplain’ if you’re ready for me.";
    // eslint-disable-next-line
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
    const [score, setScore] = React.useState(0);
    const [userdq, setUserdq] = React.useState(0);
    const [userstreak, setUserstreak] = React.useState(0);
    const [maxstreak, setMaxstreak] = React.useState(0);
    const [correctoption, setCorrectoption] = React.useState(null);
    // eslint-disable-next-line
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
    const [typing , setTyping] = React.useState(true);
    const [add, setAdd] = React.useState(0);
    const [sub, setSub] = React.useState(0);
    const [showRobot, setShowRobot] = React.useState(false);
    const [topicOverlay, setTopicOverlay] = React.useState(false);
    const [imageurl, setImageurl] = React.useState(null);
    const [gamestarted, setGamestarted] = React.useState(false);
    const [fetchTheme, setFetchTheme] = React.useState(false);
    const [leaderboardoverlay, setLeaderboardoverlay] = React.useState(false);

    // login & logout overlay state - liza working
    const [showLoginOverlay, setShowLoginOverlay] = React.useState(false)
    const [showLogoutOverlay, setShowLogoutOverlay] = React.useState(false)

    async function findcurrentTime() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let currentTime = hours + ":" + minutes + ":" + seconds;
        setTime(currentTime);
    }

    const handleWindowResize = () => {

        const windowheight = window.innerHeight;
        const windowwidth = window.innerWidth;
        const headerheight = document.querySelector('.headersection').offsetHeight;
        const interactionheight = document.querySelector('.interactionsection').offsetHeight;
        let contentsectionheighttemp = 0;

        if (windowwidth > 900) {
            contentsectionheighttemp = windowheight - headerheight - 250;
        }
        else if (windowwidth > 600) {
            contentsectionheighttemp = windowheight - headerheight - 220;
        }
        else {
            contentsectionheighttemp = windowheight - headerheight - 182;
        }

        console.log('windowheight: ', windowheight,
            'headerheight: ', headerheight,
            'interactionheight: ', interactionheight);

        contentsectionheighttemp = contentsectionheighttemp + 'px';
        console.log('contentsectionheighttemp: ', contentsectionheighttemp);
        setContentsectionheight(contentsectionheighttemp);

        };

    useEffect(() => {

        window.addEventListener('resize', handleWindowResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };

    }, []);


    useEffect(() => {

        ReactGA4.event({
            action: 'Dumbsplain Landing',
            category: 'Load',
            label: 'landing page',
            });
        
        handleWindowResize();
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
            setUserdq(topic.dq);
            setScore(topic.score);
            setImageurl(topic.imageurl);
            setFetchTheme(true);
        }
        fetchTopic();
        setGamestarted(true);
    // eslint-disable-next-line
    }, []);

    useEffect(() => {

        if(fetchTheme) {
            async function fetchTheme() {
                const theme_ = await getTheme(theme, gamestarted);
                setTheme(theme_.theme);
            }
            fetchTheme();
            setFetchTheme(false);
        }

    // eslint-disable-next-line
    }, [fetchTheme]);

    useEffect(() => {
        if (imageurl !== null || imageurl !== '') {
            setTopicOverlay(true);
        }
    }, [imageurl]);

    useEffect(() => {
        if (newuser === 1 && topicOverlay === false) {
            setInfoOverlay(true);
        }
    }, [topicOverlay, newuser]);

    useEffect(() => {

        // if the time is between 6pm and 6am, set the theme to dark
        if (time !== null) {
            let timeArray = time.split(':');
            let hours = parseInt(timeArray[0]);
            if (hours >= 18 || hours < 6) {
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
                
                ReactGA4.event({
                    action: 'Esc button Close Guide',
                    category: 'Guide Overlay',
                    label: 'Esc Guide',
                    });

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

                ReactGA4.event({
                    action: 'Esc button Close Info',
                    category: 'Info Overlay',
                    label: 'Esc Info',
                    });

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

                    ReactGA4.event({
                        action: 'Enter button Dumbsplain',
                        category: 'Dumbsplain Button',
                        label: 'Enter Dumbsplain',
                        });

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

                    ReactGA4.event({
                        action: '1 button MCQ',
                        category: 'MCQ Button',
                        label: '1 MCQ',
                        });

                    setSelectedoption(1);
                }
                else if (event.keyCode === 50) {
                    event.preventDefault();

                    ReactGA4.event({
                        action: '2 button MCQ',
                        category: 'MCQ Button',
                        label: '2 MCQ',
                        });

                    setSelectedoption(2);
                }
                else if (event.keyCode === 51) {
                    event.preventDefault();

                    ReactGA4.event({
                        action: '3 button MCQ',
                        category: 'MCQ Button',
                        label: '3 MCQ',
                        });

                    setSelectedoption(3);
                }
                else if (event.keyCode === 52) {
                    event.preventDefault();

                    ReactGA4.event({
                        action: '4 button MCQ',
                        category: 'MCQ Button',
                        label: '4 MCQ',
                        });

                    setSelectedoption(4);
                }
                else if (event.keyCode === 53) {
                    event.preventDefault();

                    ReactGA4.event({
                        action: '5 button MCQ',
                        category: 'MCQ Button',
                        label: '5 MCQ',
                        });

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

                ReactGA4.event({
                    action: 'Get Waiting Time',
                    category: 'Waiting Time',
                    label: 'Waiting Time',
                    });

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

    useEffect(() => {
        // eslint-disable-next-line
        if (explanationloaded == true) {
            setCurrentext(explanation);
        }
        // eslint-disable-next-line
    }, [explanation]);

    const handleQuizme = (e) => {

        ReactGA4.event({
            action: 'Quiz Me Button Click',
            category: 'Quiz Me Button',
            label: 'Quiz Me Button',
            });

        if (explanationloaded === true) {
            e.preventDefault();
            setQuizme(true);
            setMcqrequested(true);
            setMcqloading(true);
            async function fetchQuestion() {

                ReactGA4.event({
                    action: `Get Question LOC1 ${dumbnessLevel}`,
                    category: 'Question API',
                    label: 'Question API',
                    });

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

            if (infoOverlay === false) {
                ReactGA4.event({
                    action: 'Info Overlay Click Open',
                    category: 'Info Overlay',
                    label: 'Click Info Open',
                    });
            }
            else {
                ReactGA4.event({
                    action: 'Info Overlay Click Close',
                    category: 'Info Overlay',
                    label: 'Click Info Close',
                    });
            }

            break;
            case "score":
            if (!gameended) {
                break;
            }

            if (scoreModal === false) {
                ReactGA4.event({
                    action: 'Score Overlay Click Open',
                    category: 'Score Overlay',
                    label: 'Click Score Open',
                    });
            }
            else {
                ReactGA4.event({
                    action: 'Score Overlay Click Close',
                    category: 'Score Overlay',
                    label: 'Click Score Close',
                    });
            }

            scoreModal ? setScoreModal(false) : setScoreModal(true);
            break;
            default: console.log(e.target,"");
            // LIZA: would like to put the login & logout overlay here but don't want to mess up the code here
        }
    }

    // liza working
    const handleLoginOverlay = () => {
        setShowLoginOverlay(true)
    }

    const handleLogoutOverlay = () => {
        setShowLogoutOverlay(true)
    }

    const handleLogout = () => {
        userLogOut()
        setUser(null)
        console.log(user)
    }
    // put in "are you sure" overlay

    const handleTheme = (e) => {
        e.preventDefault();

        ReactGA4.event({
            action: 'Theme Toggle',
            category: 'Theme Toggle',
            label: 'Theme Toggle',
            });

        if (theme === 'light') {
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    }

    useEffect(() => {

        async function fetchTheme() {
            const theme_ = await getTheme(theme, gamestarted);
            setTheme(theme_.theme);
        }

        if (gamestarted) {
            fetchTheme();
        }

    // eslint-disable-next-line
    }, [theme]);

    const handleAnswersubmit = (e) => {

        ReactGA4.event({
            action: 'Submit Answer Button Click',
            category: 'Submit Answer',
            label: 'Submit Answer',
            });

        if (selectedoption === null || selectedoption === 0) {

            ReactGA4.event({
                action: 'Submit Answer without selecting an option',
                category: 'Submit Answer',
                label: 'Submit Answer',
                });

            alert('Please select an option');
        }
        if (selectedoption !== null && selectedoption !== 0) {
            e.preventDefault();
            async function fetchAnswer() {

                ReactGA4.event({
                    action: `Submit Answer ${selectedoption}`,
                    category: 'Submit Answer',
                    label: 'Submit Answer',
                    });

                const answer = await submitAnswer(selectedoption);
                // pseudoGenerator(answer.message, setCurrentext, 0.1);
                setBufferText(answer.message);
                setCorrectoption(answer.correctoption);
                setSpecial_id(answer.special_id);
                setScore(answer.score);
                setGameended(answer.gameended)
                setUserdq(answer.dq);
            }
            fetchAnswer();
            setResponsesubmitted(true);
        }
    }

    const handleConfetticomplete = () => {
        setConfetti(false);
        setConfettiamount(0);
    }

    // useEffect(() => {

    //     if (confetti && confettiamount > 0) {
    //         setTimeout(() => {
    //             setConfetti(false);
    //             setConfettiamount(0);
    //         }, 10000);
    //     }

    // }, [confetti, confettiamount]);

    useEffect(() => {
        
        if (confettiamount > 0) {
            setConfetti(true);
        }

    }, [confettiamount]);

    useEffect(() => {
        
        if (selectedoption === correctoption && responsesubmitted === true) {

            setConfettiamount([10, 20, 150, 250, 2000][dumbnessLevel - 1]);
            setAdd(1);
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
                setCorrectoption(null);
                setExplanationread(false);
                setSelectedoption(0);
            }
            else {

                ReactGA4.event({
                    action: 'Game Ended after Completing all Levels',
                    category: 'Game Ended',
                    label: 'Game Ended',
                    });

                setGameended(true);
                pseudoGenerator(bufferText, setCurrentext, 0.1, setTyping);
            }
        
        }
        else if (selectedoption !== correctoption && responsesubmitted === true && correctoption !== null) {

            ReactGA4.event({
                action: 'Game Ended after Selecting Wrong Option',
                category: 'Game Ended',
                label: 'Game Ended',
                });

            setGameended(true);
            setDumbnessLevel(prev => prev - 1);
            setShowRobot(true);
            pseudoGenerator(bufferText, setCurrentext, 0.1, setTyping);
        }

        if (correctoption === null && responsesubmitted === false && selectedoption === 0 && mcqloaded === false) {
            setMcqrequested(true);
            setMcqloading(true);
            async function fetchQuestion() {

                ReactGA4.event({
                    action: `Get Question LOC2 ${dumbnessLevel}`,
                    category: 'Question API',
                    label: 'Question API',
                    });

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

    useEffect(() => {
        if (typing===false) {
            setTimeout(() => {

                ReactGA4.event({
                    action: 'AUTO Score Modal Open at End of Game',
                    category: 'Score Modal',
                    label: 'Score Modal',
                    });

                setScoreModal(true);
            }, 5000);
        }
    }, [typing]);

    const handleSteppedDumbsplain = (e) => {
        e.preventDefault();

        ReactGA4.event({
            action: 'Dumbsplain Button Click',
            category: 'Dumbsplain Button',
            label: 'Dumbsplain Button',
            });

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

                ReactGA4.event({
                    action: `Get Question LOC3 ${dumbnessLevel}`,
                    category: 'Question API',
                    label: 'Question API',
                    });

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

    // eslint-disable-next-line
    const handleStats = (e) => {
        e.preventDefault();
        setLeaderboardoverlay(true);
    }

    return (
        <div style={{
            height: '100%',
            width: '100%',
            padding: '0',
            minheight: '500px',
        }}>
            { showRobot && <EmojiSlider showEmoji={showRobot} setShowEmoji={setShowRobot} />}
            { confetti ? <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={confettiamount}
                colors={['#8CA8FF', '#4C7BFE', '#F59E6C', '#32BCA3']}
                onConfettiComplete={handleConfetticomplete}
                gravity={0.2}
                /> : null }
            { showLoginOverlay ? <LoginOverlay showLoginOverlay={showLoginOverlay} setShowLoginOverlay={setShowLoginOverlay} theme={theme}/> : null}
            { showLogoutOverlay ? <LogoutOverlay showLogoutOverlay={showLogoutOverlay} setShowLogoutOverlay={setShowLogoutOverlay} theme={theme}/> : null}
            {/* liza working */}
            <TopicOverlay topicOverlay={topicOverlay} setTopicOverlay={setTopicOverlay} theme={theme} topic={topic} imageurl={imageurl} setImageurl={setImageurl} />
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
            score={score}
            setScore={setScore}
            />
            <LeaderBoard
            overlaybool={leaderboardoverlay}
            setOverlaybool={setLeaderboardoverlay}
            theme={theme}
            />
            <ExplanationOverlay dumbnessLevel={dumbnessLevel} explanationrequested={explanationrequested} setExplanationrequested={setExplanationrequested} theme={theme} setScore={setScore} setUserdq={setUserdq} setSub={setSub} />
            <section className='headersection'
            style={{
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '0',
                filter: (topicOverlay ? 'blur(10px)' : 'blur(0px)'),
            }}
            >
                <div className='navbar'>
                    { width > 900 ?
                    <div
                    style={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        padding: '0',
                    }}
                    >
                    <PlayerProgress
                    dq={userdq}
                    score={score}
                    add={add}
                    sub={sub}
                    />
                    </div>: null }
                    <div className='dumbsplainlogo'></div>
                    {/* <Header
                    theme={theme}
                    /> */}
                    <div className='utilitybuttons'>
                        { theme==='light' ?
                        // <svg className='lightmode' onClick={handleTheme}></svg>
                        <ReactSVG className='lightmode' onClick={handleTheme} src='../../public/lightmode.svg' />
                        : <svg className='darkmode' onClick={handleTheme}></svg>}
                        <svg className='infobutton' onClick={handleOverlay} data-overlay="info"></svg>
                        <svg className={'leaderboard' + ( !gameended ? ' blocked' : '' )}
                        onClick={handleOverlay} data-overlay="score"></svg>
                        {/* <svg className='statsbutton' onClick={handleStats} data-overlay="stats"></svg> */}
                        { user ? (
                            <button onClick={handleLogoutOverlay} className="tw-my-2 tw-rounded-xl tw-border tw-w-12 tw-text-2xs tw-border-blue_400 hover:tw-bg-orange_200 hover:tw-text-white hover:tw-border-orange_200">logout</button>
                            ) : (
                            <button onClick={handleLoginOverlay} className="tw-my-2 tw-rounded-xl tw-border tw-w-12 tw-text-2xs tw-border-blue_400 hover:tw-bg-orange_200 hover:tw-text-white hover:tw-border-orange_200">login</button>)}
                        {/* liza working */}
                    </div>
                </div>
                { width < 900 ? <PlayerProgress
                    dq={userdq}
                    score={score}
                    add={add}
                    sub={sub}
                    /> : null }
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
                    // maxHeight: '45vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0',
                    filter: (topicOverlay ? 'blur(10px)' : 'blur(0px)'),
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
                    position: 'relative',
                    filter: (topicOverlay ? 'blur(10px)' : 'blur(0px)'),
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