import React, { useRef } from 'react';
import { toBlob } from 'html-to-image';
import '../CSS/ReportCard.css';

const ReportCard = () => {
  const sectionRef = useRef(null);

  const handleShareClick = () => {

    if (!('clipboard' in navigator)) {
      console.error('Clipboard API not supported in this browser');
      return;
    }

    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        // You have permission to write to the clipboard
      } else {
        console.error('No permission to write to the clipboard');
      }
    });

    console.log(sectionRef.current);

    toBlob(sectionRef.current)
      .then((blob) => {
        const item = new ClipboardItem({ 'image/png': blob });
        console.log(item);
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

  return (
    <section ref={sectionRef}
    style={
      {
        padding: '0',
      }
    }>
      <div className='modal-content-inverted'>
          <div className='reportcard-header'>
            <div className='reportcard-header-title'>Dumbsplain Diary</div>
            <div className='reportcard-header-weekday'>Week 1</div>
            <div className='reportcard-header-weekday'>Day 2</div>
          </div>
          <div className='reportcard-body'>
            <div className='reportcard-body-left'>
              <div className='reportcard-body-left-avatar'>
                <div className='avatar1' style={{width:'158px', height:'158px', position:'absolute', bottom:'0'}}></div>
              </div>
            </div>
            <div className='reportcard-body-right'>
              <div className='reportcard-body-right-row'>
                <div id='reportcard-dumbnesslevel'>5.5</div>
                <div className='reportcard-updown'></div>
                <div id='reportcard-dq'>DQ</div>
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
                  <div className='reportcard-streakscore'>365</div>
                  <div className='reportcard-updown'
                  style={{
                    position: 'relative',
                    width: '20px',
                    height: '20px',
                    left: '-8px',
                    top: '-15px',
                  }}
                  ></div>
                  <div className='reportcard-streak-title'>Current Streak</div>
                </div>
                <div className='reportcard-streak'>
                  <div className='reportcard-streakscore'>365</div>
                  <div className='reportcard-updown'
                  style={{
                    position: 'relative',
                    width: '20px',
                    height: '20px',
                    left: '-8px',
                    top: '-15px',
                  }}
                  ></div>
                  <div className='reportcard-streak-title'>Max Streak</div>
                </div>
              </div>
            </div>
          </div>
        <div className='buttoncontainer'
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
        </div>
      </div>
    </section>
  );
};

export default ReportCard;
