import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';

const DumbsplainAvatar = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <Draggable>
      <div>
        <video
          ref={videoRef}
          width="300"
          height="200"
          src={videoUrl}
          onClick={togglePlay}
        />
      </div>
    </Draggable>
  );
};

export default DumbsplainAvatar;