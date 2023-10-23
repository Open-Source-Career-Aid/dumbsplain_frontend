import React, { useRef } from 'react';
import { useState, useEffect, useReducer } from 'react';
import '../CSS/Overlay.css';
import '../CSS/LeaderBoardLayOut.css'
// import OverlayCurve from '../SVGasComponents/leaderOverlay';
import {ReactComponent as PlayerIcon} from '../SVGasComponents/player.svg';
import {ReactComponent as CollegeIcon } from    '../SVGasComponents/icon2.svg';
import {ReactComponent as Divider} from '../SVGasComponents/sep.svg';


import ReactGA4 from 'react-ga4';
import { set } from 'react-ga';

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
    const viewRank = useRef(null);
                

    const selectLeaderBoard = function() {
        if (toggleMode) {
            return player;
        }
        else {
            return college;
        }
    } 
    function displayLeaderBoard (mode) {
        try {
            const data = selectLeaderBoard();
            console.log(data.size);
            if (data.size === 0) {
                throw new Error('LeaderBoard Data is Empty');
            }
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
                    <div key={index} className="contentBody" id={`${index}`}>
                        <article className={`leaderCard rank ${index + 1 === 1 ? 'first': index + 1 === 2 ? 'second' : index + 1 === 3 ? 'third' : ''}`} id={`${index}`}>   {index+1}<sup>{subScript(index + 1)}</sup> </article>
                        <article className="leaderCard university" id={`${index}`}><img className='LeaderIcons'alt='dumbsplain college or username profile pic' src={item[1].url}/> <span className='LeaderLabel'>{item[1].label}</span></article>
                        <article className="leaderCard dq" id={`${index}`}>{item[1].DQ}</article>
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
    viewRank.current = (displayLeaderBoard(toggleMode));
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
            const fecthRanks = async () => {
                const response = await fetch('https://api.dumbsplain.com/leaderboard');
                const data = await response.json();
                console.log(data);
                return data;
            };
            viewRank.current = (fecthRanks());
        } catch (error) {
            console.log(error);
        }

    }, [toggleMode]);

    useEffect(() => {
        handleWindowResize();
    // eslint-disable-next-line
    }, [overlaybool]);
    
    // const paintBottomLayer = data.slice(3,).map((item, index) => {
    //    return (
    //     <>
    //         <div key={index}
    //         style={{
    //             height: '25%',
    //             overflow: 'visible',
    //             marginBottom:'5px',
    //         }}
    //         >
    //             <div style={{ border: '1px solid #4C7BFE', borderRadius:'25px', height:'60%'}}>
    //                 <img style={{fontSize: '.25em', padding: '7px 0 0 0', width:'30px', height:'30px'}} src= {item.collegeLogo} alt={item.collegeName} />
    //                 <span style={{fontSize:'.5em', fontWeight: 'bold', padding: '5px', verticalAlign: 'middle'}}>{index + 4}</span>
    //                 <span style={{textAlign: 'center', fontSize: '.5em', verticalAlign:'middle'}}>{item.collegeName}</span>
    //                 <span style={{color:'#4C7BFE', fontSize: '.5em', padding: '0'}}>DQ</span><span style={{color: '#000', fontWeight: 'bolder', fontSize: '.65em', padding: '2px'}}>{item.score}</span>
    //             </div>
      
    //         </div>
    //     </>)
    // });

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
        console.log(e.target.parentNode);
        setToggleMode(!toggleMode);
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
    // const paintTopLayer = data.slice(0,3).map((item, index) => {
    //     return (
    //             <div key={index} className="collegeCard" id={`${index}`} style={{order: index === 0 ? 1 :  index - 1}}>
    //                 <span className="rank">{index+1}</span>
    //                     <img className="collegeImage" src={item.collegeLogo} alt={`${item.collegeName}`} style={{maxWidth: index === 0 ? "100%" :  index === 1 ? "75%" : "65%" }} />
    //                     <h2 id="collegeDQ">{item.collegeName}</h2>
    //                     <p id="userDQ">DQ {item.score}</p>
    //         </div>
    //     )
    // })
    console.log(theme)
    const currentMode = theme === "light" ? 'mode lightMode' : 'mode darkMode';

    const viewCurrentRanks = function(e){
        
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
                    <h1 id="title">{ toggleMode ? 'Player':'College'} LeaderBoard </h1>
                    <nav id='LeaderBoardMenu' >
                        <a className={currentMode} onClick={LeaderBoardToggle}>
                            <PlayerIcon className="Leadericons"  width="22px" height="22px" fill={toggleMode ? "#000" : "#FFF"} title='Top DQ Players' id= {toggleMode  ? 'playerRank' : ''}/> 
                            <Divider className="Leadericons" width="23px" height="19px" fill={toggleMode ? "#000" : "#FFF"} />
                            <CollegeIcon className='Leadericons' width="20px" height="20px" fill={toggleMode ? "#000" : "#FFF"} title='Top DQ College Ranks' id= {toggleMode === false ? 'collegeRank' : ''} />
                        </a>
                        <a className={currentMode}> Today </a>
                        <a className={currentMode}> This Week </a>
                        <a className={currentMode}> All Time </a>
                    </nav>
                </div>
                <div id="LeaderBoardBody">
                    <div id='contentHeader'>
                        <section id="rank">RANK</section>
                        <section id="university">{ toggleMode ? 'PLAYER':'COLLEGE'}</section>
                        <section id="DQ">DQ</section>
                    </div>
                    {viewRank.current}
                </div>
            </div>
        </div>
    )

}
