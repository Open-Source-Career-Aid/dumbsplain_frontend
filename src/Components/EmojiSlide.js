import React, { useEffect } from 'react';
import '../CSS/EmojiSlide.css';

const EmojiSlider = ({ showEmoji , setShowEmoji }) => {

  // Slide the emoji to the bottom of the screen
  useEffect(() => {
    if (showEmoji) {
      const timer = setTimeout(() => setShowEmoji(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [showEmoji, setShowEmoji]);

  return (
    <div className="emoji-container">
      {showEmoji && <div className="emoji">🤖</div>}
    </div>
  );
};

export default EmojiSlider;
