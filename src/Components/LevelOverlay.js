import React , { useState , useEffect } from 'react';
import '../CSS/Overlay.css';
import OverlayCurve from '../SVGasComponents/overlayCurve';

export default function PlayOverlay( {infoOverlay, setInfoOverlay , theme }){

    const [cardscale, setCardscale] = useState(1);

    const level = [
        ["Commence your journey from the bottom", ["AI's intelligence is calibrated to the top. See how close you can get to it!"]],
        ["Answer right away or take a hint for -0.5 points", ["1 point -> getting it right as Just Plain Dumb","5 points -> getting it right as Sentient Savant", "Play ends when you get it wrong"]],
        ["Reach for the highest Dumbness Quotient (DQ)", ["DQ is your average score this week and resets on Monday"]]];

    const handleWindowResize = () => {

        if (window.innerHeight < 620) {
            let temp = window.innerHeight / 620;
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
            let temp = 0.7; // tolerance
            setCardscale(temp);
        }
        else {
            let temp = 1; // tolerance
            setCardscale(temp);
        }

    };

    useEffect(() => {

        window.addEventListener('resize', handleWindowResize);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, []);

    useEffect(() => {
        handleWindowResize();
    }, [infoOverlay]);
    
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
                scale: `${cardscale}`,
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