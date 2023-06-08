import React from 'react';
import '../CSS/Overlay.css';
import OverlayCurve from '../SVGasComponents/overlayCurve';

export default function PlayOverlay( {infoOverlay, setInfoOverlay , theme }){
    const level = [
        ['Choose your dumbness level', ['The higher the level, the harder the challenge']],
        ['Hit Dumbsplain to have AI dumbsplain the topic to you', ['You only get one play each day, so choose wisely!']],
        ['Respond to the AI challenge', ['1 point -> getting it right as ABC', '5 points -> getting it right as CBA']],
        ['Reach for the highest Dumbness Quotient (DQ) and longest Streak', ['DQ is your average score this week and will reset next Monday']],
        ['Share your results and stand up for humankind!', ['AI will be ready for your next play at midnight']]];
    
    const leveltext = level.map((item, index) => {
       return (
        <>
            <div key={index}>
                <li className="level" >
                    {item[0]}
                </li>
                {item[1].map((item, index) => {
                    return (
                    <p key={index} className="leveltext" data-theme={theme} style={{'font-size': '0.4em'}}>{item}</p>
                    )
                })}
            </div>
        </>)
    });

    const closeOverlay = (e) => {
        e.preventDefault();
        console.log(e.target.parentNode);
        setInfoOverlay(false);
    }

    const handleOverlayClick = (e) => {
        // close overlay when clicked outside, add a listener to the window
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {
            setInfoOverlay(false);
        }
    }

    return(
        <div className={infoOverlay ? "modal-overlay" : "modal-overlay-off" } onClick={handleOverlayClick}>
            <div className='modal-content' data-theme={theme}>
                <OverlayCurve theme={theme}
                viewBox={'0 0 100% 100%'}
                styles={{
                    padding: '0',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '100%',
                    scale: '1.07',
                }}
                />
                <div className='infocontainer'>
                    <div className='headercontainer'>
                        <h1 className='heading'>Dumbsplain Guide</h1>
                        <span className='closeOverlay' onClick={closeOverlay}>&times;</span>
                    </div>
                    <ol>
                        {leveltext}
                    </ol>
                </div>
            </div>
        </div>
    )
}