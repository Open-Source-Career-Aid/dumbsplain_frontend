import LeaderboardBaseLayOut from "../Components/LeaderBoardLayOut";
// import LeaderBoard from "../Components/LeaderBoard";

const Test = () => {
    return (
        <div style={{
            overflow: 'visible',
        }}>
            {/* <LeaderBoard 
                 overlaybool= {true}
                 setOverlaybool={true}
                 theme={'#FFFFFF'}
            /> */}
            <LeaderboardBaseLayOut
                overlaybool= {true}
                setOverlaybool={true}
                theme={'dark'}
            />
        </div>

    );
    }

export default Test;