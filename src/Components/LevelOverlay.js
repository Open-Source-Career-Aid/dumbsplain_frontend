import React from 'react';
import '../CSS/Overlay.css';


export default function PlayOverlay( {infoOverlay, setInfoOverlay , theme }){
    const level = [
        ['Choose your dumbness level', 'The higher the level, the harder the challenge'],
        ['Hit Dumbsplain to have AI dumbsplain the topic to you', 'You only get one play each day, so choose wisely!'],
        ['Respond to the AI challenge', 'You get 1 point for getting the answer right at Just Plain Dumb; 5 points for getting it right at Pretentious Professor; 0 points for getting it wrong'],
        ['Reach for the highest Dumbness Quotient (DQ) and longest Streak', 'DQ is your average score over your last 7 plays'],
        ['Share your results and stand up for humankind!', 'AI will be ready for your next play at midnight']];
    const leveltext = level.map((item,index) => {
       return (
        <>
            <li key={index} className="level" >
                {item[0]}
            </li>
            <p className="leveltext" data-theme={theme} style={{'font-size': '0.4em'}}>{item[1]}</p>
        </>)
    });
    const closeOverlay = (e) => {
        e.preventDefault();
        console.log(e.target.parentNode);
        setInfoOverlay(false);
    }

    return(
        <div className={infoOverlay ? "modal-overlay" : "modal-overlay-off" }>
            <div className='modal-content' data-theme={theme}>
                <div className='headerbg'></div>
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