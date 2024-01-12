import LeaderboardBaseLayOut from "../Components/LeaderBoardLayOut";
// import LeaderBoard from "../Components/LeaderBoard";
// import DumbsplainAvatar from './DraggableVideo';
import React, { useState } from "react";

const Test = () => {
  // const videoUrl = 'https://example.com/your-video.mp4';
  const [overlaybool, setOverlaybool] = useState(false);
  return (
    <div
      style={{
        overflow: "visible",
      }}
    >
      {/* <LeaderBoard 
                 overlaybool= {true}
                 setOverlaybool={true}
                 theme={'#FFFFFF'}
            /> */}
      <LeaderboardBaseLayOut overlaybool={true} setOverlaybool={setOverlaybool} theme={"dark"} />
      {/* <DumbsplainAvatar videoUrl={videoUrl} /> */}
    </div>
  );
};

export default Test;
