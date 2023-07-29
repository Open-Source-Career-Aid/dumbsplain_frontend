import React , { useState , useEffect } from 'react';
import '../CSS/Overlay.css';
import ReactGA4 from 'react-ga4';

export default function TopicOverlay({ topicOverlay , setTopicOverlay , topic , imageurl , setImageurl , theme }){

// topicOverlay, setTopicOverlay , theme

    const [cardscale, setCardscale] = useState(1);
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

    }, []);

    useEffect(() => {
        handleWindowResize();
    }, [topicOverlay]);

    const closeOverlay = (e) => {
        e.preventDefault();
        console.log(e.target.parentNode);

        ReactGA4.event({
            action: 'Topic Overlay Click Close',
            category: 'Topic Overlay',
            label: 'Click Topic Close',
            value: new Date().getTime() - startTime,
            });

        setTopicOverlay(false);
    }

    const handleLevelOverlayClick = (e) => {
        // close overlay when clicked outside, add a listener to the window
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {

            ReactGA4.event({
                action: 'Topic Overlay Click Close',
                category: 'Topic Overlay',
                label: 'Click Topic Close',
                value: new Date().getTime() - startTime,
                });
                
            setTopicOverlay(false);
        }
    }

    return(
        <div className={topicOverlay ? "modal-overlay" : "modal-overlay-off" } onClick={handleLevelOverlayClick}>
            <div className='modal-content' data-theme={theme}
            style={{
                overflow: 'hidden',
                scale: `${cardscale}`,
            }}
            >
                <div className='infocontainer'
                style={{
                    padding: '0',
                }}
                >
                    <div className='headercontainer'>
                        <div style={{
                            padding: '0',
                        }}>
                        <h1 className='heading'
                        style={{
                            color: (theme === 'light' ? 'black' : 'white'),
                            padding: '0',
                            left: '-20px',
                        }}
                        >Topic of the Day<br />
                        <span
                        style={{
                            fontSize: '0.8em',
                            color: (theme === 'light' ? 'grey' : 'grey'),
                            padding: '0',
                            left: '-20px',
                        }}
                        >{topic}</span>
                        </h1>
                        </div>
                        <span className='closeOverlay'
                        style={{
                            color: (theme === 'light' ? 'black' : 'white'),
                        }}
                        onClick={closeOverlay}>&times;</span>
                    </div>
                    <div className='imagecontainer'
                    style={{
                        overflow: 'hidden',
                        padding: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '50%',
                    }}
                    >
                        <img src={imageurl} title="source: imgur.com" alt="topic of the day"
                        style={{
                            width: '85%',
                            height: 'auto',
                            padding: '0',
                        }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}