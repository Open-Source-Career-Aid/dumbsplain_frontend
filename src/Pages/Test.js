import BetaLeaderBoard from "../Components/BetaLeaderBoard";
import LeaderBoard from "../Components/LeaderBoard";

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
            <BetaLeaderBoard
                overlaybool= {true}
                setOverlaybool={true}
                theme={'#FFFFFF'}
            />
        <h1>Test</h1>
        </div>

    );
    }

export default Test;