import { useEffect , useState } from "react";
import getScore from "../Functions/getScore";

export default  function Acheivements({ scoreModal, setScoreModal , userdq , setUserdq , userstreak , setUserstreak , maxstreak , setMaxstreak , setSpecial_id , theme }){

    const [roundedDQ, setRoundedDQ] = useState(1);
    const [apicalled, setApicalled] = useState(false);

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
    return (
        <div className={scoreModal ? "modal-overlay" : "modal-overlay-off"} >
            <main className="modal-content" data-theme={theme}>
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

                <button id="score-btn" data-theme={theme}>
                    <p style={{color:'white', 'font-weight':'600', 'font-size': '15px'}}>
                        Share
                    </p>
                </button>
            </main>
        </div>
    )
}


