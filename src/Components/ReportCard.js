import React, { useRef , useState , useEffect } from 'react';
// import { toBlob } from 'html-to-image';
import '../CSS/ReportCard.css';
import classNames from 'classnames';
import getScore from "../Functions/getScore";
import pseudoGenerator from '../Functions/pseudoGenerator';
import ProgressChart from './ProgressChart';
import Switch from "react-switch";

const ReportCard = ({ scoreModal, setScoreModal , userdq , setUserdq , userstreak , setUserstreak , maxstreak , setMaxstreak , setSpecial_id , theme , mcqrequested , dqincreaseddecreasedorremained , setDqincreaseddecreasedorremained , responsesubmitted }) => {

  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const [cardscale, setCardscale] = useState(1);
  const referenceRef = useRef(null);
  const [roundedDQ, setRoundedDQ] = useState(1);
  const [apicalled, setApicalled] = useState(false);
  const [bordercolor, setBordercolor] = useState('#E8CF7A');
  // eslint-disable-next-line
  const [streakwindowwidth, setStreakwindowwidth] = useState('230');
  const [airesponse, setAiresponse] = useState('-');
  const [weekorday, setWeekorday] = useState('View Day');
  const [listofvalues, setListofvalues] = useState([]);

  // measure the width of the cardRef as the window resizes
  useEffect(() => {
    const handleWindowResize = () => {
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

    window.addEventListener('resize', handleWindowResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

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

        async function fetchScore() {
            const score = await getScore();
            setUserdq(score.dq);
            setUserstreak(score.streak);
            setMaxstreak(score.maxstreak);
            setSpecial_id(score.special_id);
            setRoundedDQ(Math.round(score.dq));
            setDqincreaseddecreasedorremained(score.change); // 0 for increase, 1 for remain, 2 for decrease
            // round the list values to 1 decimal place
            let temp = JSON.parse(score.weeklylist);
            for (let i = 0; i < temp.length; i++) {
                temp[i] = Math.floor(temp[i] * 10) / 10;
            }
            setListofvalues(temp);
            pseudoGenerator(score.airesponse, setAiresponse, 0.1);
            // setAiresponse(score.airesponse);
        }

        if (scoreModal === true && apicalled === false) {

            fetchScore();
            setApicalled(true);

        }
        
    // eslint-disable-next-line
    }, [scoreModal]);

    useEffect(() => {

      if (mcqrequested === true ) {
        setApicalled(false);
      }

    // eslint-disable-next-line
    }, [mcqrequested]);

    useEffect(() => {

      if (responsesubmitted === true ) {
        console.log('responsesubmitted is true');
        setApicalled(false);
      }

      if (apicalled === false && responsesubmitted === true) {
        console.log('apicalled is false and responsesubmitted is true');
        // setScoreModal(true);
      }


    // eslint-disable-next-line
    }, [responsesubmitted, apicalled]);


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
  
  const handleCloseOverlayClick = () => {
    setScoreModal(false);
  }

  const handleWeeokorDayClick = () => {
     switch (weekorday) {
      case 'View Week':
        setWeekorday('View Day');
        break;
      case 'View Day':
        setWeekorday('View Week');
        break;
      default:
        setWeekorday('View Week');
        break;
    }
  }

  return (
     <div className={scoreModal ? "modal-overlay" : "modal-overlay-off" } onClick={handleScoreOverlayClick}>
        <section ref={sectionRef}
        className='reportcard-section-main'
        style={
          {
            padding: '0',
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }>
          <div className='modal-content-inverted'
          style={{
            border: '5px solid',
            borderColor: `${bordercolor}`,
            scale: `${cardscale}`,
          }}
          ref={cardRef}
          data-theme={theme}>
              <span className="closeOverlay reportcard" data-theme={theme} onClick={handleCloseOverlayClick}>&times;</span>
              <div className='reportcard-header' data-theme={theme}>
                <div className='reportcard-header-left'>
                  <div className='reportcard-header-title' data-theme={theme}>Dumbsplain Diary</div>
                  <div className='reportcard-header-weekday' data-theme={theme}><span className='weekdayspan'>Cycle 1</span></div>
                  <div className='reportcard-header-weekday' data-theme={theme}>Day 2</div>
                </div>
                <div className='reportcard-toggle' data-theme={theme}>
                  <Switch onChange={handleWeeokorDayClick} checked={weekorday==='View Day'}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  />
                </div>
              </div>
              <div className='reportcard-body' data-theme={theme}>
                <div className='reportcard-body-left' data-theme={theme}>
                  <div className='reportcard-body-left-avatar' data-theme={theme}>
                    <div className={avatarname} style={{width:'158px', height:'158px', position:'absolute', bottom:'0', top: 'auto'}}></div>
                  </div>
                </div>
                <div className='reportcard-body-right' data-theme={theme}
                style={{
                  position: 'absolute',
                }}
                >
                  <section style={{
                    padding: '0',
                  }}>
                    <div className='reportcard-body-right-row'
                    style={{
                      position: 'relative',
                      justifyContent: 'space-between',
                      overflow: 'hidden',
                      padding: '0',
                    }} data-theme={theme}>
                    <section id='reference-section-for-width-1'
                    ref={referenceRef}
                    style={{
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      padding: '0',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                    data-theme={theme}>
                      <div id='reportcard-dq' data-theme={theme}>
                        <div className='inner-content'
                        style={{
                          position: 'relative',
                          fontSize: '1em',
                          lineHeight: '1em',
                          overflow: 'hidden',
                          padding: '0',
                          textAlign: 'left',
                          textIndent: '-0.1em',
                        }}
                        data-theme={theme}>
                          DQ
                        </div>
                      </div>
                      <div id='reportcard-dumbnesslevel'
                      // style={{
                      //   marginLeft: '10px',
                      // }}
                      data-theme={theme}>
                        <div className='inner-content'
                        style={{
                          position: 'relative',
                          bottom: '0',
                          fontSize: '0.8em',
                          lineHeight: '0.8em',
                          overflow: 'hidden',
                          padding: '0'
                        }}
                        data-theme={theme}>
                          {userdq}
                        </div>
                      </div>
                      </section>
                    </div>
                    <div className='reportcard-body-right-row'
                    style={{
                      position: 'relative',
                      padding: '0',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    data-theme={theme}>
                      <div className='reportcard-streak' data-theme={theme}>
                        <div className='reportcard-streak-title'
                        style={{
                          width: '72px',
                        }}
                        data-theme={theme}>Current Streak</div>
                        <div className='reportcard-streakscore' data-theme={theme}>{userstreak}</div>
                      </div>
                      <div className='reportcard-streak'
                      style={{
                        paddingLeft: '20px',
                      }}
                      data-theme={theme}>
                        <div className='reportcard-streak-title'
                        style={{
                          width: '59px',
                        }}
                        data-theme={theme}>Max Streak</div>
                        <div className='reportcard-streakscore' data-theme={theme}>{maxstreak}</div>
                      </div>
                    </div>
                  </section>
                  <section
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    height: '208px',
                    padding: '0',
                  }}
                  >
                  <div className={updownornone} data-theme={theme}></div>
                  </section>
                </div>
                { weekorday === 'View Week' ? <div className='messagefromai' data-theme={theme}>
                  <div className='messagefromai-title' data-theme={theme}>MESSAGE FROM AI:</div>
                  <div className='messagefromai-textbox' data-theme={theme}>
                    <div className='messagefromai-text' data-theme={theme}>{airesponse}</div>
                    {/* eslint-disable-next-line */}
                    {/* <a href='#' className='messagefromai-link' data-theme={theme}>Link</a> */}
                  </div>
                </div> : 
                <div className='reportcard-chart'>
                  <ProgressChart
                  linecolor={bordercolor}
                  listofvalues={listofvalues}
                  />
                </div>
                }
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
