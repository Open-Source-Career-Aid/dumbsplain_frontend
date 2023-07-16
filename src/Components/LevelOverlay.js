import React from 'react';
import '../CSS/Overlay.css';
import OverlayCurve from '../SVGasComponents/overlayCurve';

export default function PlayOverlay( {infoOverlay, setInfoOverlay , theme }){
    const level = [
        ["Embrace your dumbness, uncover your humanity", ["Choose your dumbness level for the topic.", "Beware! If you overestimate your brilliance to start, you will be penalized 50% of the level you picked."]],
        ["Answer right away or take a hint for -0.5 points", ["1 point -> getting it right as Just Plain Dumb","5 points -> getting it right as Sentient Savant", "Play ends when you get it wrong"]],
        ["Reach for the highest Dumbness Quotient (DQ)", ["DQ is your average score this week and resets on Monday"]]];
    
    const leveltext = level.map((item, index) => {
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
                        Answer right away or take a hint for <span style={{padding: '0', color: '#F59E6C', fontSize: 'inherit'}}>-0.5 points</span>
                    </li>
                </>
                : <li className="level">
                    {item[0]}
                </li> }
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

    const handleLevelOverlayClick = (e) => {
        // close overlay when clicked outside, add a listener to the window
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {
            setInfoOverlay(false);
        }
    }

    return(
        <div className={infoOverlay ? "modal-overlay" : "modal-overlay-off" } onClick={handleLevelOverlayClick}>
            <div className='modal-content' data-theme={theme}
            style={{
                overflow: 'hidden',
            }}
            >
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
                    <ol
                    style={{
                        height: 'auto',
                        overflow: 'visible',
                    }}
                    >
                        {leveltext}
                    </ol>
                </div>
            </div>
        </div>
    )
}