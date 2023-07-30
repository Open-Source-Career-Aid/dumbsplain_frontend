import React , { useState , useEffect } from 'react';
import '../CSS/Overlay.css';
import ReactGA4 from 'react-ga4';
import pseudoGenerator from '../Functions/pseudoGenerator';

export default function TopicOverlay({ topicOverlay , setTopicOverlay , topic , imageurl , setImageurl , theme }){

// topicOverlay, setTopicOverlay , theme

    const [cardscale, setCardscale] = useState(1);
    const [startTime, setStartTime] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {

        if (topicOverlay) {
            setTimeout(() => {
                pseudoGenerator(topic, setText, 0.6, null, 1);
            }, 500);
        }

    }, [topicOverlay, topic]);

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

    return(
        <div className={topicOverlay ? "modal-overlay" : "modal-overlay-off" }
        style={{
            // backgroundColor: (theme === 'light' ? 'rgba(0, 0, 0)' : 'grey'),
            zIndex: '100000',
        }}
        >
            <div className='modal-content' data-theme={theme}
            style={{
                overflow: 'hidden',
                scale: `${cardscale}`,
                justifyContent: 'flex-start',
            }}
            >
                <div
                style={{
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
                >
                    <div className='headercontainer'
                    style={{
                        position: 'relative',
                        overflow: 'visible',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
                        <h1
                        style={{
                            color: (theme === 'light' ? 'black' : 'white'),
                            padding: '0',
                            position: 'static',
                            textAlign: 'center',
                            fontSize: '0.7em',
                            marginTop: '40px',
                            fontWeight: 'normal',
                        }}
                        >TOPIC OF THE DAY<br />
                        <span
                        style={{
                            fontSize: '0.9em',
                            color: (theme === 'light' ? 'grey' : 'grey'),
                            padding: '0',
                            position: 'static',
                            fontWeight: 'bold',
                        }}
                        >{text}</span>
                        </h1>
                    </div>
                    <div className='imagecontainer'
                    style={{
                        overflow: 'hidden',
                        padding: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        marginTop: '40px',
                    }}
                    >
                        <img src={imageurl} title="source: imgur.com" alt="topic of the day"
                        style={{
                            width: '85%',
                            height: 'auto',
                            padding: '0',
                            display: `${text!=='' ? 'block' : 'none'}`
                        }}
                        className={topicOverlay ? "fade-in" : "fade-out"}
                        />
                    </div>
                    <div className='buttoncontainer'
                    style={{
                        scale: "1",
                        marginTop: '40px',
                        display: `${imageurl !== null && imageurl !== '' && text !== '' ? 'flex' : 'none'}`,
                    }}
                    >
                        <div className='dumbsplainbutton' onClick={closeOverlay}>
                            <div className='dumbsplainbuttontext'>Play</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}