// creates a leaderboard for the beta version of the game
import React from "react";
import '../CSS/Overlay.css';
import '../CSS/leaderboardExp.css';
// import OverlayCurve from '../SVGasComponents/leaderOverlay';
import ReactGA4 from 'react-ga4';
import {useState, useEffect} from 'react';
// dummy data for the leaderboard with harvard as university name and 4 as score
const data = [
     {collegeName: "Harvard University", score: 4},
     {collegeName: "Harvard University", score: 4},
     {collegeName: "Harvard University", score: 4},
     {collegeName: "Harvard University", score: 4},
     {collegeName: "Harvard University", score: 4},
     {collegeName: "Harvard University", score: 4},
     {collegeName: "Harvard University", score: 4},
     {collegeName: "Harvard University", score: 4} 
]



export default function BetaLeaderBoard({ overlaybool, setOverlaybool, theme }) {
    const [cardscale, setCardscale] = useState(0.1);
    const [startTime, setStartTime] = useState(null);
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

    useEffect(() => {
        handleWindowResize();
    // eslint-disable-next-line
    }, [overlaybool]);
    
    const paintBottomLayer = data.slice(3,).map((item, index) => {
       return (
        <>
            <div key={index}
            style={{
                height: 'auto',
                overflow: 'visible',
            }}
            >
                { index === 1 ? 
                <>
                    <li className="level">
                        placeholder
                    </li>
                </>
                : <li className="level">
                    {item[0]}
                </li> }
            </div>
        </>)
    });

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
    const paintTopLayer = data.slice(0,3).map((item, index) => {
        return (
                <div key={index} className="collegeCard" id={`${index}`} style={{order: index === 0 ? 1 :  index - 1}}>
                    <div className="index"></div>
                    <span className="rank">{index+1}</span>
                    <div className="collegeImage">
                        <img src="https://upload.wikimedia.org/wikipedia/en/0/0c/Harvard_shield_wreath.svg" alt="Harvard University" />
                    </div>
                    <div className="collegeDetails">
                        <h2>{item.collegeName}</h2>
                        <p>Score: {item.score}</p>
                        <p>Rank: {index+1}</p>
                    </div>
            </div>
        )
    })

    return(
        <div className={overlaybool ? "modal-overlay" : "modal-overlay-off" } onClick={handleLevelOverlayClick}>
            <div className='modal-content'  data-theme={theme}
            style={{
                overflow: 'hidden',
                scale: `${cardscale}`,
                width: '100%',
                height: '100%',
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
                <div className='infocontainer topThree'>
                    <div className="curve"></div>
                    <div className="content">
                        <h1 className="collegeText"> Leaderboard</h1>
                        <div className="collegeCards">
                        {paintTopLayer}
                    </div>
                         
                    </div>
                    <span className='closeOverlay' onClick={closeOverlay}>&times;</span>
                    

                {/* <div>

                </div> */}
            </div>
            <div className='lastFour' style={{width:'100%'}}>
                    <ol
                    style={{
                        height: 'auto',
                        overflow: 'visible',
                    }}
                    >
                        {paintBottomLayer}
                    </ol>
                </div>
            </div>
        </div>
    )

}
