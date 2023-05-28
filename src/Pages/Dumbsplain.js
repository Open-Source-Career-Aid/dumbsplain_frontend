import React from 'react';
import { useEffect } from "react";
import '../CSS/Dumbsplain.css';
import Header from '../Components/Header';
import Dumbsplainer from '../Components/Dumbsplainer';
import DumbLevel from '../Components/DumbLevel';
import AnswerOptions from '../Components/AnswerOptions';
import PlayOverlay from '../Components/LevelOverlay';
import Acheivements from '../Components/ScoreModal';
import getTopic from '../Functions/getTopic';
import getExplanation from '../Functions/getExplanation';
import getQuestion from '../Functions/getQuestion';
import WaitingBox from '../Components/WaitingBox';
import getWaitingtime from '../Functions/getWaitingtime';

function Dumbsplain( ) {

    let placeholder = 'Select your dumbness level for an explanation of Topic.';
    const [explanation, setExplanation] = React.useState('explanation text');
    const [mcq, setMcq] = React.useState('mcq text');
    const [dumbnessLevel, setDumbnessLevel] = React.useState(1);
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
    const [userdq, setUserdq] = React.useState(null);
    const [userstreak, setUserstreak] = React.useState(null);
    const [theme, setTheme] = React.useState('light');


    useEffect(() => {
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
        if (dumbnessLevel !== null) {
            e.preventDefault();
            setExplanationrequested(true);
            setExplanationloading(true);
            async function fetchExplanation() {
                const explanation = await getExplanation(dumbnessLevel);
                setExplanation(explanation.explanation);
                setSpecial_id(explanation.special_id);
            }
            fetchExplanation();
            setExplanationloading(false);
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
                setMcq(mcq.question);
                setSpecial_id(mcq.special_id);
            }
            fetchQuestion();
            setMcqloading(false);
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


    return (
        <div>
            <div className='bg' data-theme={theme}></div>
            <PlayOverlay infoOverlay={infoOverlay} setInfoOverlay={setInfoOverlay} theme={theme} />
            <Acheivements
            scoreModal={scoreModal}
            setScoreModal={setScoreModal}
            userdq={userdq}
            setUserdq={setUserdq}
            userstreak={userstreak}
            setUserstreak={setUserstreak}
            setSpecial_id={setSpecial_id}
            theme={theme}
            />
            <div className='navbar'>
                <div className='dumbsplainlogo'></div>
                <div className='utilitybuttons'>
                    { theme==='light' ?
                    <svg className='lightmode' onClick={handleTheme}></svg>
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
            <div className='answeroptionscontainer'>
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
                />
            </div>
            }

            { explanationloaded ?
                <>
                { !quizme ?
                <div className='buttoncontainer'>
                    <div className='dumbsplainbutton' onClick={handleQuizme}>
                        <div className='dumbsplainbuttontext'>Quiz Me</div>
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
        </div>
    );
    }

export default Dumbsplain;