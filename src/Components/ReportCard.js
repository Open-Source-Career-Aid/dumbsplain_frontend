import React, { useRef , useState , useEffect } from 'react';
// import { toBlob } from 'html-to-image';
import '../CSS/ReportCard.css';
import classNames from 'classnames';
import getScore from "../Functions/getScore";

const ReportCard = ({ scoreModal, setScoreModal , userdq , setUserdq , userstreak , setUserstreak , maxstreak , setMaxstreak , setSpecial_id , theme , mcqrequested , dqincreaseddecreasedorremained , setDqincreaseddecreasedorremained }) => {

  const sectionRef = useRef(null);
  const referenceRef = useRef(null);
  const [roundedDQ, setRoundedDQ] = useState(1);
  const [apicalled, setApicalled] = useState(false);
  const [bordercolor, setBordercolor] = useState('#E8CF7A');
  // eslint-disable-next-line
  const [streakwindowwidth, setStreakwindowwidth] = useState('230');

  useEffect(() => {

        if (dqincreaseddecreasedorremained === 0) {
            setBordercolor('#32BCA3');
        } else if (dqincreaseddecreasedorremained === 1) {
            setBordercolor('#E8CF7A');
        } else if (dqincreaseddecreasedorremained === 2) {
            setBordercolor('#D65757');
        }

    // eslint-disable-next-line

  }, [dqincreaseddecreasedorremained]);

  useEffect(() => {

        if (scoreModal === true && apicalled === false) {

        async function fetchScore() {
            const score = await getScore();
            setUserdq(score.dq);
            setUserstreak(score.streak);
            setMaxstreak(score.maxstreak);
            setSpecial_id(score.special_id);
            setRoundedDQ(Math.round(score.dq));
            setDqincreaseddecreasedorremained(score.change); // 0 for increase, 1 for remain, 2 for decrease
        }

            fetchScore();
            setApicalled(true);

        }
        
    // eslint-disable-next-line
    }, [scoreModal]);

  // const handleShareClick = () => {

  //   if (!('clipboard' in navigator)) {
  //     console.error('Clipboard API not supported in this browser');
  //     return;
  //   }

  //   navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
  //     if (result.state === 'granted' || result.state === 'prompt') {
  //       // You have permission to write to the clipboard
  //     } else {
  //       console.error('No permission to write to the clipboard');
  //     }
  //   });

  //   console.log(sectionRef.current);

  //   toBlob(sectionRef.current)
  //     .then((blob) => {
  //       const item = new ClipboardItem({ 'image/png': blob });
  //       console.log(item);
  //       navigator.clipboard.write([item])
  //         .then(() => {
  //           console.log('Image copied to clipboard!');
  //         })
  //         .catch((error) => {
  //           console.error('Error copying image to clipboard:', error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error('Error converting HTML to image:', error);
  //     });
  // };

  const avatarname = classNames({
        'avatar1': roundedDQ === 1 || roundedDQ === 0,
        'avatar2': roundedDQ === 2,
        'avatar3': roundedDQ === 3,
        'avatar4': roundedDQ === 4,
        'avatar5': roundedDQ === 5,
    });
  
  const handleScoreOverlayClick = (e) => {
        // close overlay when clicked outside, add a listener to the window
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {
            setScoreModal(false);
        }
    }

  const updownornone = classNames('reportcard-updown', {
        'up': dqincreaseddecreasedorremained === 0,
        'down': dqincreaseddecreasedorremained === 2,
        'nochange': dqincreaseddecreasedorremained === 1,
    });

  return (
     <div className={scoreModal ? "modal-overlay" : "modal-overlay-off" } onClick={handleScoreOverlayClick}>
        <section ref={sectionRef}
        style={
          {
            padding: '0',
          }
        }>
          <div className='modal-content-inverted'
          style={{
            border: '5px solid',
            borderColor: `${bordercolor}`,
          }}
          >
              <div className='reportcard-header'>
                <div className='reportcard-header-title'>Dumbsplain Diary</div>
                <div className='reportcard-header-weekday'><span className='weekdayspan'>Cycle</span> 1</div>
                <div className='reportcard-header-weekday'><span className='weekdayspan'>Day</span> 2</div>
              </div>
              <div className='reportcard-body'>
                <div className='reportcard-body-left'>
                  <div className='reportcard-body-left-avatar'>
                    <div className={avatarname} style={{width:'158px', height:'158px', position:'absolute', bottom:'0'}}></div>
                  </div>
                </div>
                <div className='reportcard-body-right'>
                  <div className='reportcard-body-right-row'
                  style={{
                    position: 'absolute',
                    top: '100px',
                    left: '280px',
                    width: '299px',
                    height: '104px',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    padding: '0',
                  }}>
                  <section id='reference-section-for-width-1'
                  ref={referenceRef}
                  style={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '0',
                    width: '78%',
                    justifyContent: 'space-between',
                  }}
                  >
                    <div id='reportcard-dq'>
                      <div className='inner-content'
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        fontSize: '1em',
                        lineHeight: '1em',
                        overflow: 'hidden',
                        padding: '0',
                        textAlign: 'left',
                      }}
                      >
                        DQ
                      </div>
                    </div>
                    <div id='reportcard-dumbnesslevel'
                    // style={{
                    //   marginLeft: '10px',
                    // }}
                    >
                      <div className='inner-content'
                      style={{
                        position: 'absolute',
                        bottom: '0',
                        fontSize: '0.8em',
                        lineHeight: '0.8em',
                        overflow: 'hidden',
                        padding: '0'
                      }}
                      >
                        {userdq}
                      </div>
                    </div>
                    </section>
                    <div className={updownornone}></div>
                  </div>
                  <div className='reportcard-body-right-row'
                  style={{
                    position: 'absolute',
                    width:`${streakwindowwidth}px`,
                    height: '104px',
                    left: '280px',
                    top: '219px',
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  >
                    <div className='reportcard-streak'>
                      <div className='reportcard-streak-title'
                      style={{
                        width: '72px',
                      }}
                      >Current Streak</div>
                      <div className='reportcard-streakscore'>{userstreak}</div>
                    </div>
                    <div className='reportcard-streak'
                    style={{
                      paddingLeft: '20px',
                    }}
                    >
                      <div className='reportcard-streak-title'
                      style={{
                        width: '59px',
                      }}
                      >Max Streak</div>
                      <div className='reportcard-streakscore'>{maxstreak}</div>
                    </div>
                  </div>
                </div>
                <div className='messagefromai'>
                  <div className='messagefromai-title'>MESSAGE FROM AI:</div>
                  <div className='messagefromai-textbox'>
                    <div className='messagefromai-text'>You are doing great! Keep it up! You are doing great! Keep it up! You are doing great! Keep it up!</div>
                    {/* eslint-disable-next-line */}
                    <a href='#' className='messagefromai-link'>Link</a>
                  </div>
                </div>
              </div>
            {/* <div className='buttoncontainer'
            style={{
              position: 'absolute',
              bottom: '0',
              }}
            >
              <div className='dumbsplainbutton' onClick={handleShareClick}
              style={{
                backgroundColor: '#8CA8FF',
              }}
              >
                  <div className='dumbsplainbuttontext'>Share</div>
              </div>
            </div> */}
          </div>
        </section>
    </div>
  );
};

export default ReportCard;
