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
import isLoggedIn from '../Functions/isLoggedIn';

// dummy data for the leaderboard with harvard as university name and 4 as score
const player = new Map([
    [0, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }],
    [1, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }],
    [2, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }],
    [3, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }],
    [4, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }],
    [5, { label: 'User Name', DQ: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }]
]);

const college = new Map([
    [0, { label: 'Dumbsplain University', dq: 5.0, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }],
    [1, { label: 'Dumbsplain University', dq: 4.0, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }],
    [2, { label: 'Dumbsplain University', dq: 3.0, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }],
    [3, { label: 'Dumbsplain University', dq: 2.0, url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Dumbsplain_University_shield.png' }]
]);


export default function LeaderboardBaseLayOut ({ overlaybool, setOverlaybool, theme, setShowLoginOverlay, user}) {
    const [cardscale, setCardscale] = useState(0.1);
    const [startTime, setStartTime] = useState(null);
    const [toggleMode, setToggleMode] = useState(false);
    const [changeBgTheme, setChangeBgTheme] = useState("today");
    const [boardType, setBoardType] = useState(1);
    const displayBoard = {"current": null};
    const displayBoard2 = useRef(null);
    let displayBoard3 = null;
    const forceUpdate = useForceUpdate();
    // const isLogged = (async () => await isLoggedIn())(); 
    const [isLoggedInBool, setisLoggedInBool] = useState(false);
    const [leaderBoardData, setLeaderBoardData] = useState(null);

    const selectLeaderBoard = async function(mode = 1, type = +toggleMode) {
        // returns the correct leaderboard based on the toggleMode
        // const data = await getLeaderBoard(+toggleMode);
        const LITERAL = ['daily', 'weekly', 'lifetime'];
        if (type === 0) {
            const res = await getLeaderBoard(type);
            // retrieve the correct data from the response
            return  new Map(Object.entries(res["data"][LITERAL[mode-1]]));
        }
        else {
            return college;
        }
      
    } 
    async function  displayLeaderBoard  (mode=1, type=+toggleMode) {
        // mode 1 = today, mode 2 = this week, mode 3 = all time
        try {
            // await the data from the server
            // const data = await getLeaderBoard(type);
            // console.log('displayLeaderBoard', mode, type);
            const data = await selectLeaderBoard(mode, type);
            // console.log(data);
            // check if promise has been resolved
            // on error throw an error
            if (data.size === 0 || data === undefined || data === null) {
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

                // iterate through map object and return the data in the format above
                return [...data.entries()].map((item, index) => {
                    return (
                        <div key={index} className={`contentBody ${item[1].selected ? 'currentPlayer': ''}`} id={`${index}`} data-mode= {theme === "light" ? "light" : "dark"}>
                            <article className={`leaderCard rank ${item[1].rank === 1 ? 'first': item[1].rank === 2 ? 'second' : item[1].rank === 3 ? 'third' : ''}`} id={`${item[1].rank}`}>   {item[1].rank}<sup>{subScript(item[1].rank)}</sup> </article>
                            <article className="leaderCard university" id={`${index}`}><img className='LeaderIcons'alt='dumbsplain college or username profile pic' src={userAvatarLevel(item[1].dq)}/> <span className='LeaderLabel'>{item[1].label}</span></article>
                            <article className="leaderCard dq" id={`${index}`}>{item[1].dq}</article>
                        </div>
                    );
                });  
              

         } catch (error) {
                // console.log(error);
                return (
                    <div className='errorInfoBox' style={{color: 'red', fontSize: '1.5em', 
                    fontWeight: 'bold', textAlign: 'center', padding: '10px'}}> 
                  🤖... No ranking avaliabe be the first to play and get ranked! 
                </div>);
                }
    };

    // // default data to be displayed
    // if (overlaybool === true) (async () => { 
    //     displayBoard2.current = (await displayLeaderBoard(boardType, +toggleMode));
    //     // update reactDOM once the data has been fetched
    //     
        
    // })();

    
    // console.log(toggleMode);
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
   
            (async () => {  
                // (await displayLeaderBoard(boardType, +toggleMode))
                // update reactDOM once the data has been fetched
                forceUpdate();
            })();
 
        } catch (error) {
            // console.log(error);
            return
        }

    }, [toggleMode, boardType]);
    // Use this effect to observe changes in displayBoard2 and trigger a re-render


    useEffect(() => {
        handleWindowResize();
    // eslint-disable-next-line
    }, [overlaybool]);   

    const closeOverlay = (e) => {
        e.preventDefault();
        // console.log(e.target.parentNode);
        ReactGA4.event({
            action: 'Info Overlay Click Close',
            category: 'Info Overlay',
            label: 'Click Info Close',
            value: new Date().getTime() - startTime,
            });

        setOverlaybool(false);
    }

    useEffect( () => {
        async function fetchUser () { 
            try { 
                let res;
                res = await isLoggedIn(); 
                // console.log(res.is_user);
                setisLoggedInBool(res.is_user);
            } catch (error) { 
                setisLoggedInBool(false);
        }
    }
    fetchUser();
    }
    , [user, isLoggedInBool]);

    useEffect( () => {
        async function fetchLeaderBoard () { 
            const resp = await displayLeaderBoard(boardType, +toggleMode);
            setLeaderBoardData(resp);
            forceUpdate();

        }
        fetchLeaderBoard();
        // setLeaderBoardData(data);
    }, [boardType, toggleMode, isLoggedInBool, theme, user]);

    
    const LeaderBoardToggle = (e) => {
        e.preventDefault();
        // console.log(e.target.parentNode, boardType);
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

    const currentMode = theme === "light" ? 'mode lightMode' : 'mode darkMode';
    const handleButtonClick = async (mode = 1, bg = "today", e) => {
        e.preventDefault();
        setChangeBgTheme(bg);
        setBoardType(mode);
        // Update the displayBoard2 ref based on the new mode and boardType
        forceUpdate();
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        const value = e.target.value;
        switch (value) {
            case 'true':
                // hide the overlay
                setOverlaybool(false);
                setShowLoginOverlay(true);
                break;
            case 'false':
                // redirect to signup page
                window.location.href = '/signup';
                break;
            default:
                break;
        }
    }

    const signUpMsgBox = () => {
        return (
            <div className={`signup-overlay ${theme === 'light' ? 'msglight' : 'msgdark' }`} >
                <div class="close-msg-overlay" onClick={(e) => { e.preventDefault();
                    // set the display to none
                    const msg = document.getElementsByClassName('signup-overlay')[0];
                    msg.style.display = 'none';
                    console.log(isLoggedInBool, "is logged in");
                    ReactGA4.event({
                        action: 'SignUp Message Overlay Click Close',
                        category: 'Signup Message Overlay',
                        label: 'Click Signup Closed for Anonymous User',
                        value: new Date().getTime() - startTime,
                        });
                     }}>&times;</div>
                <p id='btn-para'>Only logged players can view their rankings. <br/> Are 🫵 a registred player?</p> <aside id='btn-container'><button className='sign-btn no' value={false} onClick={handleSignUp} >NO</button> <button className="sign-btn yes" data-mode={`${theme === 'light' ? 'light' : 'dark' }`} value={true} onClick={handleSignUp} >Yes</button></aside>
            </div>
        );
    }
  
    
    

    return(
        <div className={overlaybool ? "modal-overlay" : "modal-overlay-off" } onClick={handleLevelOverlayClick}>
            <div className={'modal-content '}   data-theme={theme}
            style={{
                overflow: 'hidden',
                scale: `${cardscale}`,
                width: '100%',
                height: '100%',
                backgroundColor: theme === "light" ? '#fff' : '#17213F'
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
                 <span className='closeOverlay' onClick={closeOverlay} style={{
                    position: 'relative',
                    margin: '0 .5em 0 0',
                    color: theme === "light" ? '#000' : '#fff',
                    overflow: 'visible',
                 }} >&times;</span>
                <div id="LeaderBoardNav" className={theme === "light" ? 'light' : 'dark'}>
                    <h1 id="title">{ !toggleMode ? 'Player':'College'} LeaderBoard </h1>
                    <nav id='LeaderBoardMenu' >
                        <a className={currentMode} onClick={LeaderBoardToggle} id="toggleBtn">
                            <PlayerIcon className="Leadericons"  width="22px" height="22px" fill={!toggleMode ? "#000" : "#FFF"} title='Top DQ Players' id= {!toggleMode  ? 'playerRank' : ''}/> 
                            <Divider className="Leadericons" width="23px" height="19px" fill={!toggleMode ? "#000" : "#FFF"} />
                            <CollegeIcon className='Leadericons' width="20px" height="20px" fill={!toggleMode ? "#000" : "#FFF"} title='Top DQ College Ranks' id= {!toggleMode === false ? 'collegeRank' : ''} />
                        </a>
                        <a className={`${currentMode} ${boardType === 1 ? 'active': 'inactive'}`} href='#' onClick={(e) => handleButtonClick(1,'today', e)} title='shows leaderboard today ranks'> Today </a>
                        <a className={`${currentMode} ${boardType === 2 ? 'active': 'inactive'}`}href='#' onClick={(e) => handleButtonClick(2, 'week', e)} title='show leaderboard ranks for current week'> This Week </a>
                        <a className={`${currentMode} ${boardType === 3 ? 'active': 'inactive'}`} href='#' onClick={(e) => handleButtonClick(3, 'allTime', e)} title ='show all time leaderboard rank'> All Time </a>
                    </nav>
                </div>
                {/* add datalist to leaderboardbody */}
                

                <div id="LeaderBoardBody" className={`${theme === "light" ? 'light' : 'dark'}`} data-bg={changeBgTheme} >
                    <div id='contentHeader'>
                        <section id="rank">RANK</section>
                        <section id="university">{ !toggleMode ? 'PLAYER':'COLLEGE'}</section>
                        <section id="DQ">DQ</section>
                    </div>
                    {leaderBoardData}
                    {isLoggedInBool ? null : signUpMsgBox() }

                </div>
            </div>
        </div>
    )
}
