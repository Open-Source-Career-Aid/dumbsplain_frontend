import { useEffect , useState , useRef } from "react";
import getScore from "../Functions/getScore";
import { toBlob } from 'html-to-image';
import OverlayCurve from "../SVGasComponents/overlayCurve";
import classNames from 'classnames';

export default  function Acheivements({ scoreModal, setScoreModal , userdq , setUserdq , userstreak , setUserstreak , maxstreak , setMaxstreak , setSpecial_id , theme , mcqrequested }){

    const [roundedDQ, setRoundedDQ] = useState(1);
    const [apicalled, setApicalled] = useState(false);
    const sectionRef = useRef(null);

    const handleShareClick = () => {
        toBlob(sectionRef.current)
        .then((blob) => {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item])
            .then(() => {
                console.log('Image copied to clipboard!');
            })
            .catch((error) => {
                console.error('Error copying image to clipboard:', error);
            });
        })
        .catch((error) => {
            console.error('Error converting HTML to image:', error);
        });
    };


    useEffect(() => {

        if (scoreModal === true && apicalled === false) {

        async function fetchScore() {
            const score = await getScore();
            setUserdq(score.dq);
            setUserstreak(score.streak);
            setMaxstreak(score.maxstreak);
            setSpecial_id(score.special_id);
            setRoundedDQ(Math.round(score.dq));
        }

        if (mcqrequested) {

            fetchScore();
            setApicalled(true);

        }

        }
        
    // eslint-disable-next-line
    }, [scoreModal]);
    
    const closeOverlay = (e) => {
        e.preventDefault();
        console.log(e.target.parentNode);
        setScoreModal(false);
    }

    const handleScoreOverlayClick = (e) => {
        // close overlay when clicked outside, add a listener to the window
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {
            setScoreModal(false);
        }
    }

    const avatarname = classNames({
        'avatar1': roundedDQ === 1 || roundedDQ === 0,
        'avatar2': roundedDQ === 2,
        'avatar3': roundedDQ === 3,
        'avatar4': roundedDQ === 4,
        'avatar5': roundedDQ === 5,
    });

    return (
        <div className={scoreModal ? "modal-overlay" : "modal-overlay-off"}>
            <main className="modal-content" data-theme={theme} ref={sectionRef} onClick={handleScoreOverlayClick}>
                {/* <div className='headerbg' style={{'opacity':'0.6'}}></div> */}
                <OverlayCurve theme={theme}
                viewBox={'0 0 100% 100%'}
                styles={{
                    padding: '0',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '100%',
                    scale: '1.07',
                    opacity: '0.6'
                }}
                />
                <span className="closeOverlay" onClick={closeOverlay}>&times;</span>
                {/*  replace avatar1 with  dummy level */}
                <section className={avatarname} style={{ height: '25vh', width: '25vw', position: 'relative', 'z-index': '10000', 'margin-top': '40px' }}></section>
                <section id="score" style={{position: 'relative', 'z-index': '10000', 'padding': '10% 0' }}>
                    <p className="dqtext">Dumbness Quotient</p>
                    <p id="score-value" style={{textAlign: "center"}}>{userdq}</p>
                </section>

                <section id="streak">
                    <div className="streaktext" style={{'padding-right':'3em'}}>
                        Current Streak
                        <p className="streak"> {userstreak} </p>
                    </div>
                    <div className="streaktext" style={{'padding-left':'3em'}}>
                        Max Streak
                        <p  className="streak">{maxstreak}</p>
                    </div>
                </section>

                <button id="score-btn" data-theme={theme} onClick={handleShareClick}>
                    <p style={{color:'white', 'font-weight':'600', 'font-size': '15px'}}>
                        Share
                    </p>
                </button>
            </main>
        </div>
    )
}


