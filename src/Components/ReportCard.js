import React, { useRef , useState , useEffect } from 'react';
// import { toBlob } from 'html-to-image';
import '../CSS/ReportCard.css';
import classNames from 'classnames';
import getScore from "../Functions/getScore";
import pseudoGenerator from '../Functions/pseudoGenerator';
import ProgressChart from './ProgressChart';
// import * as htmlToImage from 'html-to-image';
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
// import FileSaver from 'file-saver';
import { avatarlabels } from '../config';
import domtoimage from 'dom-to-image';
import ReactGA4 from 'react-ga4';

const ReportCard = ({ scoreModal, setScoreModal , userdq , setUserdq , userstreak , setUserstreak , maxstreak , setMaxstreak , setSpecial_id , theme , mcqrequested , dqincreaseddecreasedorremained , setDqincreaseddecreasedorremained , responsesubmitted , score , setScore }) => {

  // const sectionRef = useRef(null);
  // const cardRef = useRef(null);
  const [cardscale, setCardscale] = useState(1);
  const referenceRef = useRef(null);
  const [roundedDQ, setRoundedDQ] = useState(-1);
  const [apicalled, setApicalled] = useState(false);
  const [bordercolor, setBordercolor] = useState('#E8CF7A');
  // eslint-disable-next-line
  const [streakwindowwidth, setStreakwindowwidth] = useState('230');
  const [airesponse, setAiresponse] = useState('-');
  // eslint-disable-next-line
  const [weekorday, setWeekorday] = useState('View Day');
  const [listofvalues, setListofvalues] = useState([]);
  const [cycle, setCycle] = useState(0);
  const [day, setDay] = useState(0);
  const reportCardRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [typename, setTypename] = useState(true);
  const [avatarlabel, setAvatarlabel] = useState('');
  const [updatedroundeddq, setUpdatedroundeddq] = useState(false);
  const [allowcopy, setAllowcopy] = useState(false);
  const [startTime, setStartTime] = useState(null);
  // const [blob, setBlob] = useState(null);

  useEffect(() => {
    setStartTime(new Date().getTime());
  }, []);

  // eslint-disable-next-line
  const snapshotCreator = () => {
    return new Promise((resolve, reject) => {
      try {
        const scale = window.devicePixelRatio;
        const element = reportCardRef.current; // You can use element's ID or Class here
        domtoimage
          .toBlob(element, {
            height: element.offsetHeight * scale,
            width: element.offsetWidth * scale,
            // style: {
            //   transform: "scale(" + scale + ")",
            //   transformOrigin: "top left",
            //   width: element.offsetWidth + "px",
            //   height: element.offsetHeight + "px",
            // },
          })
          .then(() => {
            domtoimage
            .toBlob(element, {
              height: element.offsetHeight * scale,
              width: element.offsetWidth * scale,
              // style: {
              //   transform: "scale(" + scale + ")",
              //   transformOrigin: "top left",
              //   width: element.offsetWidth + "px",
              //   height: element.offsetHeight + "px",
              // },
            })
            .then(() => {
              domtoimage
              .toBlob(element, {
                height: element.offsetHeight * scale,
                width: element.offsetWidth * scale,
                style: {
                  transform: "scale(" + scale + ")",
                  transformOrigin: "top left",
                  width: element.offsetWidth + "px",
                  height: element.offsetHeight + "px",
                },
              })
              .then((blob) => {
                resolve(blob);
                ReactGA4.event({
                  category: 'Screenshot Blob Created',
                  action: 'Screenshot Blob Created',
                  label: 'Screenshot Blob Created',
                });

              });
            });
          });
      } catch (e) {
        reject(e);
      }
    });
  };

  // const readImageFromClipboard = async () => {
  //   const clipboardItems = await navigator.clipboard.read();
  //   const imageItem = clipboardItems.find((item) => item.types.includes('image/png') || item.types.includes('image/jpeg'));

  //   if (!imageItem) {
  //     throw new Error('No image found in clipboard');
  //   }

  //   const blob = await imageItem.getType(imageItem.types[0]);
  //   return blob;
  // };

  // const handleShare = async () => {
    
  //   try {
  //     const blob = await readImageFromClipboard();
  //     const file = new File([blob], 'clipboard-image.png', { type: blob.type });

  //     if (navigator.canShare && navigator.canShare({ files: [file] })) {
  //       navigator.share({
  //         files: [file],
  //         title: 'My Image',
  //         text: 'Check out this cool image!',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error reading image from clipboard:', error);
  //   }

  //   };

  const handleCopy = () => {

    ReactGA4.event({
      category: 'Share Button Clicked',
      action: 'Share Button Clicked',
      label: 'Share Button Clicked',
    });

    const isSafari = /^((?!chrome|android).)*safari/i.test(
      navigator?.userAgent
    );

    const copyImageToClipBoardSafari = () => {
      if(isSafari) {
        navigator.clipboard
          .write([
            new ClipboardItem({
              "image/png": new Promise(async (resolve, reject) => {
                try {
                  const blob = await snapshotCreator();
                  resolve(new Blob([blob], { type: "image/png" }));
                } catch (err) {
                  reject(err);
                }
              }),
            }),
          ])
          .then(() =>
            {setCopied(true);
            // handleShare();
            
            ReactGA4.event({
              category: 'Screenshot Copied to Clipboard - Safari',
              action: 'Screenshot Copied to Clipboard - Safari',
              label: 'Screenshot Copied to Clipboard - Safari',
            });

            }

          )
          .catch((err) =>
            // Error
            console.error("Error:", err)
          );
      }
    }

    const isNotFirefox = navigator.userAgent.indexOf("Firefox") < 0;

    const copyImageToClipBoardOtherBrowsers = () => {
      if(isNotFirefox) {
        navigator?.permissions
          ?.query({ name: "clipboard-write" })
          .then(async (result) => {
            if (result.state === "granted") {
              const type = "image/png";
              const blob = await snapshotCreator();
              let data = [new ClipboardItem({ [type]: blob })];
              navigator.clipboard
                .write(data)
                .then(() => {
                  setCopied(true);
                  // handleShare();

                  ReactGA4.event({
                    category: 'Screenshot Copied to Clipboard - Other Browsers',
                    action: 'Screenshot Copied to Clipboard - Other Browsers',
                    label: 'Screenshot Copied to Clipboard - Other Browsers',
                  });

                })
                .catch((err) => {
                  // Error
                  console.error("Error:", err)
                });
            }
        });
      } else {
        // alert("Firefox does not support this functionality");
        // firefox so we download the image
        const downloadImage = async () => {
          try {
            const blob = await snapshotCreator();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "reportcard.png";
            a.click();
            URL.revokeObjectURL(url);
            // removes the element from the DOM after the download
            a.remove();
            setCopied(true);

            ReactGA4.event({
              category: 'Screenshot Downloaded - Firefox',
              action: 'Screenshot Downloaded - Firefox',
              label: 'Screenshot Downloaded - Firefox',
            });

          }
          catch (err) {
            alert('Browser does not support this functionality! Please use Chrome or Safari or Firefox.')
            console.log(err);
          }     
        }
        downloadImage();
      }
    }

    if (isSafari) {
      copyImageToClipBoardSafari();
    }
    else {
      copyImageToClipBoardOtherBrowsers();
    }
  };

  useEffect(() => {

    if (copied) {
      setCopied(false);
      alert('Copied to Clipboard!');
    }

  }, [copied]);

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

  // measure the width of the cardRef as the window resizes
  useEffect(() => {

    window.addEventListener('resize', handleWindowResize);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    handleWindowResize();
  }, [scoreModal]);

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
            let tempcycle = ''
            const score = await getScore();
            tempcycle = score.weekstart + ' - ' + score.weekend;
            setCycle(tempcycle);
            setUserdq(score.dq);
            // setUserstreak(score.scoretoday);
            setScore(score.scoretoday);
            setMaxstreak(score.maxstreak);
            setSpecial_id(score.special_id);
            setRoundedDQ(Math.round(score.dq));
            setDqincreaseddecreasedorremained(score.change); // 0 for increase, 1 for remain, 2 for decrease
            setDay(JSON.parse(score.weeklylist).length);
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
            setTimeout(() => {
              setAllowcopy(true);
            }, 5000);

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

      if (apicalled === false && responsesubmitted === true) {
        console.log('apicalled is false and responsesubmitted is true');
        // setScoreModal(true);
      }

      if (scoreModal===true && typename===false && updatedroundeddq===true) {
        let temp = '';
          if (roundedDQ === 0) {
            temp = avatarlabels[0];
          } else if (roundedDQ === 1) {
            temp = avatarlabels[0];
          } else if (roundedDQ === 2) {
            temp = avatarlabels[1];
          } else if (roundedDQ === 3) {
            temp = avatarlabels[2];
          } else if (roundedDQ === 4) {
            temp = avatarlabels[3];
          } else if (roundedDQ === 5) {
            temp = avatarlabels[4];
          }
        setTimeout(() => {
          pseudoGenerator(temp, setAvatarlabel, 0.4, false, 1);
        }, 1000);
        setTypename(true);
      }

      if (responsesubmitted === true ) {
        console.log('responsesubmitted is true');
        setApicalled(false);
      }

    // eslint-disable-next-line
    }, [responsesubmitted, apicalled, scoreModal, typename, updatedroundeddq, roundedDQ]);

    useEffect(() => {

      setTypename(false);
      setUpdatedroundeddq(true);

    }, [roundedDQ]);

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

            ReactGA4.event({
              category: 'Score Overlay Close',
              action: 'Score Overlay',
              label: 'Score Overlay Close',
              value: new Date().getTime() - startTime,
            });
        }
    }

  const updownornone = classNames('reportcard-updown', {
    'up': dqincreaseddecreasedorremained === 0,
    'down': dqincreaseddecreasedorremained === 2,
    'nochange': dqincreaseddecreasedorremained === 1,
  });
  
  const handleCloseOverlayClick = () => {
    setScoreModal(false);

    ReactGA4.event({
      category: 'Score Overlay Close',
      action: 'Score Overlay',
      label: 'Score Overlay Close',
      value: new Date().getTime() - startTime,
    });
    
  }

  // const handleWeeokorDayClick = () => {
  //    switch (weekorday) {
  //     case 'View Week':
  //       setWeekorday('View Day');
  //       break;
  //     case 'View Day':
  //       setWeekorday('View Week');
  //       break;
  //     default:
  //       setWeekorday('View Week');
  //       break;
  //   }
  // }

  return (
     <div className={ scoreModal ? "modal-overlay" : "modal-overlay-off" } onClick={handleScoreOverlayClick}>
        <section
        className='reportcard-section-main'
        style={
          {
            padding: '0',
            margin: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            scale: `${cardscale}`,
          }
        }>
          <div className='modal-content-inverted'
          ref={reportCardRef}
          style={{
            border: '5px solid',
            borderColor: `${bordercolor}`,
          }}
          // ref={cardRef}
          data-theme={theme}>
              <span className="closeOverlay reportcard" data-theme={theme} onClick={handleCloseOverlayClick}>&times;</span>
              <div className='reportcard-header' data-theme={theme}>
                <div className='reportcard-header-left'>
                  <div className='reportcard-header-title' data-theme={theme}>Dumbsplain Diary</div>
                  <div className='reportcard-header-weekday' data-theme={theme}><span className='weekdayspan'>{cycle}</span></div>
                  { weekorday==='View Week' ? <div className='reportcard-header-weekday' data-theme={theme}>Day {day}</div> : null}
                </div>
                {/* <div className='reportcard-toggle' data-theme={theme}>
                  <Switch onChange={handleWeeokorDayClick} checked={weekorday==='View Day'}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor={'#888'}
                  />
                </div> */}
              </div>
              <div className='reportcard-body' data-theme={theme}>
                <div className='reportcard-body-left' data-theme={theme}>
                  <div className='reportcard-body-left-avatar' data-theme={theme}>
                    <div className={avatarname} style={{width:'158px', height:'158px', position:'absolute', bottom:'28px', top: 'auto'}}></div>
                    <div style={{width:'170px', height:'20px', position:'absolute', bottom:'0', top: 'auto', fontSize: '0.4em', textAlign: 'center', paddingTop: '6px', borderTop: '2px solid #D9D9D9', fontFamily: 'GloriaHallelujah', color: '#D65757', lineHeight: '1em'}}>{avatarlabel}</div>
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
                        data-theme={theme}>Today's Score</div>
                        <div className='reportcard-streakscore' data-theme={theme}>{score}</div>
                      </div>
                      <div className='reportcard-streak'
                      style={{
                        paddingLeft: '20px',
                      }}
                      data-theme={theme}>
                        <button
                        onClick={handleCopy}
                        className={'sharebutton'
                        + (allowcopy ? '' : ' disabled')
                        }
                        data-theme={theme}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}
                        >
                          Share
                          <div className='shareicon' data-theme={theme}></div>
                        </button>
                        {/* <div className='reportcard-streak-title'
                        style={{
                          width: '59px',
                        }}
                        data-theme={theme}>Max Streak</div>
                        <div className='reportcard-streakscore' data-theme={theme}>{maxstreak}</div> */}
                        {/* <div className={ weekorday==='View Week' ? 'weekicon' : 'dayicon' }
                        onClick={handleWeeokorDayClick}
                        ></div> */}
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
                  theme={theme}
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
