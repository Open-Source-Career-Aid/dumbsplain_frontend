import React, { useRef } from 'react';
// import { toBlob } from 'html-to-image';
import '../CSS/ReportCard.css';

const ReportCard = () => {
  const sectionRef = useRef(null);

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

  return (
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
                <div className='avatar1' style={{width:'158px', height:'158px', position:'absolute', bottom:'0'}}></div>
              </div>
            </div>
            <div className='reportcard-body-right'>
              <div className='reportcard-body-right-row'>
                <div id='reportcard-dq'>DQ</div>
                <div id='reportcard-dumbnesslevel'>5.5</div>
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
                  <div className='reportcard-streakscore'>365</div>
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
                  <div className='reportcard-streakscore'>365</div>
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
  );
};

export default ReportCard;
