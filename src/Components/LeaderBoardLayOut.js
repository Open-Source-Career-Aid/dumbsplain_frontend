import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import '../CSS/Overlay.css';
import '../CSS/LeaderBoardLayOut.css'
// import OverlayCurve from '../SVGasComponents/leaderOverlay';
import {ReactComponent as PlayerIcon} from '../SVGasComponents/player.svg';
import {ReactComponent as CollegeIcon } from    '../SVGasComponents/icon2.svg';
import {ReactComponent as Divider} from '../SVGasComponents/sep.svg';
import getLeaderBoard  from '../Functions/getLeaderBoardRanks';
import useForceUpdate from '../Functions/forceUpdate';
import ReactGA4 from 'react-ga4';
import checkForStaleData from '../Functions/cacheData';
import { set } from 'react-ga';
import userAvatarLevel from '../Functions/userAvatarLevel';

// dummy data for the leaderboard with harvard as university name and 4 as score
const player = new Map([
    [0, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }],
    [1, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }],
    [2, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }],
    [3, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }],
    [4, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }],
    [5, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }]
]);

const college = new Map([
    [0, { label: 'Harvard University', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }],
    [1, { label: 'Harvard University', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }],
    [2, { label: 'Harvard University', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }],
    [3, { label: 'Harvard University', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Harvard_University_shield.png' }]
]);
console.log(player.get(0));


export default function LeaderboardBaseLayOut ({ overlaybool, setOverlaybool, theme}) {
    const [cardscale, setCardscale] = useState(0.1);
    const [startTime, setStartTime] = useState(null);
    const [toggleMode, setToggleMode] = useState(false);
    const [changeBgTheme, setChangeBgTheme] = useState("today");
    const [boardType, setBoardType] = useState(1);
    const [displayBoard, setDisplayBoard] = useState(null);
    const displayBoard2 = useRef(null);
    const forceUpdate = useForceUpdate();
    const leaderBoardData = useRef(null);

    const selectLeaderBoard = async function(mode = 1, type = +toggleMode) {
        // returns the correct leaderboard based on the toggleMode
        // const data = await getLeaderBoard(+toggleMode);
        const LITERAL = ['daily', 'weekly', 'lifetime'];
        // if (!(leaderBoardData.current === null || leaderBoardData.current === undefined)) {
        //     console.log(LITERAL[mode-1], type);
        //     if (type === 1) {
        //         const res = await getLeaderBoard(type);
        //         // retrieve the correct data from the response
        //         console.log(res["data"][LITERAL[mode-1]]);
        //         leaderBoardData.current = res["data"];
        //         return  new Map(Object.entries(res["data"][LITERAL[mode-1]]));
        //     }
        //     else {
        //         leaderBoardData.current = college
        //         return college;
        //     }
        // }
        // else {
        //     console.group('LeaderBoard Data', leaderBoardData.current);
        //     return leaderBoardData.current[LITERAL[mode-1]];
        // }
        console.log(type);
        if (type === 0) {
            const res = await getLeaderBoard(type);
            // retrieve the correct data from the response
            console.log(res["data"][LITERAL[mode-1]]);
            leaderBoardData.current = res["data"];
            return  new Map(Object.entries(res["data"][LITERAL[mode-1]]));
        }
        else {
            leaderBoardData.current = college
            return college;
        }
      
    } 
    async function  displayLeaderBoard  (mode=1, type=+toggleMode) {
        // mode 1 = today, mode 2 = this week, mode 3 = all time
        try {
            // await the data from the server
            // const data = await getLeaderBoard(type);
            console.log('displayLeaderBoard', mode, type);
            const data = await selectLeaderBoard(mode, type);

            // check if promise has been resolved
            // on error throw an error
            if (data.size === 0 || data === undefined) {
                throw new Error('LeaderBoard Data is Empty');
            }
            // if data is not empty, display the data
                const subScript = function (num) { 
                    // returns the correct subscript for the number
                    if (num === 1) {
                        return 'st';
                    }
                    else if (num === 2) {
                        return 'nd';
                    }
                    else if (num === 3) {
                        return 'rd';
                    }
                    else {
                        return 'th';
                    }
                }
        
                console.log(data);
                // iterate through map object and return the data in the format above
                return [...data.entries()].map((item, index) => {
                    return (
                        <div key={index} className={`contentBody ${item[1].selected ? 'active': ''}`} id={`${index}`}>
                            <article className={`leaderCard rank ${index + 1 === 1 ? 'first': index + 1 === 2 ? 'second' : index + 1 === 3 ? 'third' : ''}`} id={`${index}`}>   {index+1}<sup>{subScript(index + 1)}</sup> </article>
                            <article className="leaderCard university" id={`${index}`}><img className='LeaderIcons'alt='dumbsplain college or username profile pic' src={userAvatarLevel(item[1].dq)}/> <span className='LeaderLabel'>{item[1].label}</span></article>
                            <article className="leaderCard dq" id={`${index}`}>{item[1].dq}</article>
                        </div>
                    );
                });  
              

         } catch (error) {
                console.log(error);
                return (
                    <div className='errorInfoBox' style={{color: 'red', fontSize: '1.5em', 
                    fontWeight: 'bold', textAlign: 'center', padding: '10px'}}> 
                    🤖... Error displaying LeaderBoard; please reload your page. 
                </div>);
                }
    };

    // default data to be displayed
    if (overlaybool === true) (async () => { 
        displayBoard2.current = (await displayLeaderBoard(boardType, +toggleMode));
        // update reactDOM once the data has been fetched

    })();

    
    console.log(toggleMode);
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

        setStartTime(new Date().getTime());

        window.addEventListener('resize', handleWindowResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    // eslint-disable-next-line
    }, []);

    useEffect( () => {
        try {
            // check if data is in client side cache and age is less than 1 hour

            // if (typeof (Storage) !== "undefined") {
            //     console.log('Data is stale, fetching new data');
            //     const lastFetched = typeof Number(localStorage.getItem('lastFetched')) === Number ? Number(localStorage.getItem('lastFetched')) : 0;
            //     const isStaleData = checkForStaleData(Date.now(), lastFetched);
            //     const cachedMode = typeof  localStorage.getItem(`boardType${+toggleMode}`) === "string" ? +(localStorage.getItem(`boardType${+toggleMode}`)) : toggleMode;
            //     if (isStaleData ) {
            //         // fetch new data todos

            //     }
            //     else{
            //         // use cached data
            //         setBoardType(cachedMode);
            //         displayBoard2.current = displayLeaderBoard(boardType, cachedMode);
            //     }
            // }
   
            (async () => {  
                displayBoard2.current = (await displayLeaderBoard(boardType, +toggleMode))
                // update reactDOM once the data has been fetched
                forceUpdate();
            })();
 
        } catch (error) {
            console.log(error);
        }

    }, [toggleMode, boardType]);
    // Use this effect to observe changes in displayBoard2 and trigger a re-render


    useEffect(() => {
        handleWindowResize();
    // eslint-disable-next-line
    }, [overlaybool]);   

    const closeOverlay = (e) => {
        e.preventDefault();
        console.log(e.target.parentNode);

        ReactGA4.event({
            action: 'Info Overlay Click Close',
            category: 'Info Overlay',
            label: 'Click Info Close',
            value: new Date().getTime() - startTime,
            });

        setOverlaybool(false);
    }

    const LeaderBoardToggle = (e) => {
        e.preventDefault();
        console.log(e.target.parentNode, boardType);
        setToggleMode(!toggleMode);
        handleButtonClick(boardType, changeBgTheme, e);
    }

    const handleLevelOverlayClick = (e) => {
        // close overlay when clicked outside, add a listener to the window
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {

            ReactGA4.event({
                action: 'Info Overlay Click Close',
                category: 'Info Overlay',
                label: 'Click Info Close',
                value: new Date().getTime() - startTime,
                });
                
                setOverlaybool(false);
        }
    }

    console.log(theme, displayBoard2.current);
    const currentMode = theme === "light" ? 'mode lightMode' : 'mode darkMode';


    const handleButtonClick = async (mode = 1, bg = "today", e) => {
        e.preventDefault();
        setChangeBgTheme(bg);
        setBoardType(mode);
        // Update the displayBoard2 ref based on the new mode and boardType
        displayBoard2.current = await displayLeaderBoard(boardType, +toggleMode);
        forceUpdate();
    }
    
    return(
        <div className={overlaybool ? "modal-overlay" : "modal-overlay-off" } onClick={handleLevelOverlayClick}>
            <div className={'modal-content '}   data-theme={theme}
            style={{
                overflow: 'hidden',
                scale: `${cardscale}`,
                width: '100%',
                height: '100%',
                backgroundColor: theme === "light" ? '#fff' : '#252525'
            }}
            >
                {/* <OverlayCurve theme={theme}
                viewBox={'0 0 100% 100%'}
                styles={{
                    padding: '0',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '100%',
                    scale: '1.07',
                }}/> */}
                <div id="LeaderBoardNav" className={theme === "light" ? 'light' : 'dark'}>
                    <h1 id="title">{ !toggleMode ? 'Player':'College'} LeaderBoard </h1>
                    <nav id='LeaderBoardMenu' >
                        <a className={currentMode} onClick={LeaderBoardToggle}>
                            <PlayerIcon className="Leadericons"  width="22px" height="22px" fill={toggleMode ? "#000" : "#FFF"} title='Top DQ Players' id= {toggleMode  ? 'playerRank' : ''}/> 
                            <Divider className="Leadericons" width="23px" height="19px" fill={toggleMode ? "#000" : "#FFF"} />
                            <CollegeIcon className='Leadericons' width="20px" height="20px" fill={toggleMode ? "#000" : "#FFF"} title='Top DQ College Ranks' id= {toggleMode === false ? 'collegeRank' : ''} />
                        </a>
                        <a className={`${currentMode} ${boardType === 1 ? 'active': 'inactive'}`} href='#' onClick={(e) => handleButtonClick(1,'today', e)} title='shows leaderboard today ranks'> Today </a>
                        <a className={`${currentMode} ${boardType === 2 ? 'active': 'inactive'}`}href='#' onClick={(e) => handleButtonClick(2, 'week', e)} title='show leaderboard ranks for current week'> This Week </a>
                        <a className={`${currentMode} ${boardType === 3 ? 'active': 'inactive'}`} href='#' onClick={(e) => handleButtonClick(3, 'allTime', e)} title ='show all time leaderboard rank'> All Time </a>
                    </nav>
                </div>
                {/* add datalist to leaderboardbody */}
                

                <div id="LeaderBoardBody" data-bg={changeBgTheme} >
                    <div id='contentHeader'>
                        <section id="rank">RANK</section>
                        <section id="university">{ toggleMode ? 'PLAYER':'COLLEGE'}</section>
                        <section id="DQ">DQ</section>
                    </div>
                    {displayBoard2.current}
                </div>
            </div>
        </div>
    )
}
