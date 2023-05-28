import React from 'react';
import '../CSS/Overlay.css';


export default function PlayOverlay( {infoOverlay, setInfoOverlay , theme }){
    const level = [
        ['Choose your dumbness level', 'The higher the level, the harder the question.	You can only hit ‘Dumbsplain’ at one level each day, so choose wisely!'],
        ['Let AI dumbsplain the topic for you', null],
        ['Answer the generated question', 'You get 1 point for getting the answer right at Just Plain Dumb;	5 points for getting the answer right at Pretentious Professor; 0 points for getting the answer wrong'],
        ['Reach the highest Dumbness Quotient (DQ) and Longest Streak', 'DQ is your average score over your last 5 plays'],
        ['Share your results and prove that AI is not the best of you', 'AI gets ready for your next play at midnight']];
    const leveltext = level.map((item,index) => {
       return (
        <li key={index} className="level" >
            {item[0]}
            <p className="leveltext" data-theme={theme}>{item[1]}</p>
        </li>)
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