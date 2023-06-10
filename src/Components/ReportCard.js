import React, { useRef , useState , useEffect } from 'react';
// import { toBlob } from 'html-to-image';
import '../CSS/ReportCard.css';
import classNames from 'classnames';
import getScore from "../Functions/getScore";

const ReportCard = ({ scoreModal, setScoreModal , userdq , setUserdq , userstreak , setUserstreak , maxstreak , setMaxstreak , setSpecial_id , theme , mcqrequested , dqincreaseddecreasedorremained , setdqincreaseddecreasedorremained }) => {

  const sectionRef = useRef(null);
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
            setRoundedDQ(Math.round(score.dq));
            setdqincreaseddecreasedorremained(score.change); // 0 for increase, 1 for remain, 2 for decrease
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
            borderColor: '#32BCA3',
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
                  <div className='reportcard-body-right-row'>
                    <div id='reportcard-dq'>DQ</div>
                    <div id='reportcard-dumbnesslevel'>{userdq}</div>
                    <div className='reportcard-updown'></div>
                  </div>
                  <div className='reportcard-body-right-row'
                  style={{
                    position: 'absolute',
                    width:' 367px',
                    height: '104px',
                    left: '253px',
                    top: '219px'
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
