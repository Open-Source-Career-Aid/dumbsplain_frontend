import { useEffect , useState , useRef } from "react";
import getScore from "../Functions/getScore";
import { toBlob } from 'html-to-image';

export default  function Acheivements({ scoreModal, setScoreModal , userdq , setUserdq , userstreak , setUserstreak , maxstreak , setMaxstreak , setSpecial_id , theme }){

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
            setRoundedDQ(Math.floor(score.dq)+1);
        }

        fetchScore();
        setApicalled(true);

        }
        
    // eslint-disable-next-line
    }, [scoreModal]);
    
    const closeOverlay = (e) => {
        e.preventDefault();
        console.log(e.target.parentNode);
        setScoreModal(false);
    }

    useEffect(() => {
        // if the user clicks outside of the modal-content, close it
        window.onclick = function(event) {
            if (event.target.className === "modal-overlay") {
                setScoreModal(false);
            }
        }
    }, [setScoreModal]);

    return (
        <div className={scoreModal ? "modal-overlay" : "modal-overlay-off"} >
            <main className="modal-content" data-theme={theme} ref={sectionRef}>
                <div className='headerbg' style={{'opacity':'0.6'}}></div>
                <span className="closeOverlay" onClick={closeOverlay}>&times;</span>
                {/*  replace avatar1 with  dummy level */}
                <section className={"avatar"+roundedDQ} style={{ height: '25vh', width: '25vw', position: 'relative', 'z-index': '10000', 'margin-top': '40px' }}></section>
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


