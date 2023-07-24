import React, { useState, useEffect } from 'react';
import '../CSS/EmojiSlide.css';

const EmojiSlider = () => {
  const [showEmoji, setShowEmoji] = useState(true);

  // Slide the emoji to the bottom of the screen
  useEffect(() => {
    if (showEmoji) {
      const timer = setTimeout(() => setShowEmoji(false), 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showEmoji]);

  return (
    <div className="emoji-container">
      {showEmoji && <div className="emoji">🤖</div>}
    </div>
  );
};

export default EmojiSlider;
