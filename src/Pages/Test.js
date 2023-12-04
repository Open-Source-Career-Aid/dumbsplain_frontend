import LeaderboardBaseLayOut from "../Components/LeaderBoardLayOut";
// import LeaderBoard from "../Components/LeaderBoard";
// import DumbsplainAvatar from './DraggableVideo';

const Test = () => {
  // const videoUrl = 'https://example.com/your-video.mp4';
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
      <LeaderboardBaseLayOut overlaybool={true} setOverlaybool={true} theme={"dark"} />
      {/* <DumbsplainAvatar videoUrl={videoUrl} /> */}
    </div>
  );
};

export default Test;
