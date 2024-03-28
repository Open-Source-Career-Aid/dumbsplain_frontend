import { useState , useEffect } from "react";
import getLeaderBoard from "../Functions/getLeaderBoard";
import '../CSS/leaderboard.css';

const Navigator = ({ navigationdict , setNavigationDict , theme }) => {

    const handleClick = (index) => {
        let newNavigationDict = navigationdict.map((item, i) => {
            if (i === index) {
                return {...item, selected: true};
            } else {
                return {...item, selected: false};
            }
        });
        setNavigationDict(newNavigationDict);
    }

    return (
        <div className="navigator-container">
            {/* map the items in navigationdict and based on if item.selected is true, highlight it */}
            {navigationdict.map((item, index) => (
                <div className="nav-item-container">
                    <div className='nav-item'
                    style={{
                        backgroundColor: item.selected ? (theme === 'dark' ? '#4C7BFE' : '#4C7BFE1A') : (theme === 'dark' ? '#252525' : '#FFFFFF'),
                        color: item.selected ? '#FFFFFF' : '#4C7BFE',
                    }}
                    onClick={() => handleClick(index)}
                    >{item.name}</div>
                </div>
            ))}
        </div>
    )
}

const UserBox = ({ userstate , theme }) => {

    return (
        <>
        <div className="userbox-container">
            <div
            style={{
                fontSize: '1em',
                padding: '0px',
                fontWeight: 'bold',
                color: theme === 'dark' ? '#FFFFFF' : '#4C7BFE',
            }}
            >
                {/* User: {userstate.id} */}
                You
            </div>
            <div
            style={{
                fontSize: '1em',
                padding: '0px',
                fontWeight: 'bold',
                color: theme === 'dark' ? '#FFFFFF' : '#4C7BFE',
            }}
            >
                School Rank: {userstate.schoolrank}
            </div>
            <div
            style={{
                fontSize: '1em',
                padding: '0px',
                fontWeight: 'bold',
                color: theme === 'dark' ? '#FFFFFF' : '#4C7BFE',
            }}
            >
                DQ: {userstate.dq}
            </div>
        </div>
        </>
    )
}

const LeaderTable = ({ leaderboard , userstate , theme , addschool }) => {

    return (
        <div className="leadertable-container">
            {/* display the first three items in leaderboard */}
            <>
            {leaderboard.slice(0, 3).map((item) => (
                <>
                { item.position === 'first' || item.position === 'second' || item.position === 'third' ?
                <div className={"table-row"+(theme === 'dark' ? " bg-[#4C7BFE]" : "")
                + (item.selected ? " border-[#4C7BFE] border-[2px]" : "")}
                style={{
                    backgroundColor: theme === 'dark' ? '#4C7BFE' : '#4C7BFE1A',
                    border: item.selected ? '2px solid #4C7BFE' : 'none',
                }}
                >
                    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '0px',
                    }}>
                        <div
                        style={{
                            fontSize: '14px',
                            padding: '0px',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                        >
                            <div
                            style={{
                                color: theme === 'dark' ? '#FFFFFF' : '#000000',
                                fontWeight: 'bold',
                                fontSize: '1em',
                                padding: '0px',
                                marginRight: '10px',
                            }}
                            >
                                {item.rank}
                            </div>
                            <div
                            style={{
                                color: theme === 'dark' ? '#FFFFFF' : '#000000',
                                fontSize: '1em',
                                padding: '0px',
                            }}
                            >
                                {item.school}
                            </div>
                        </div>
                        <div
                        style={{
                            color: theme === 'dark' ? '#FFFFFF' : '#000000',
                            fontSize: '16px',
                            padding: '0px',
                        }}
                        >
                            {item.dq}
                        </div>
                    </div>
                    {
                        item.selected && (
                            <UserBox
                            userstate={userstate}
                            theme={theme}
                            />
                        )
                    }
                </div> : null }
                </>
            ))}
            </>
            {/* display the fourth if position is middle */}
            {leaderboard[3].position === 'middle' && (
                <>
                { leaderboard[0].selected === false &&    
                <div
                style={{
                    // border: '2px dotted #4C7BFE',
                    width: '80%',
                    height: '100%',
                    padding: '0px',
                    borderStyle: 'dotted',
                    borderColor: theme === 'dark' ? '#4C7BFE' : '#000000',
                    borderWidth: '2px',
                    borderTop: 'none',
                    borderBottom: 'none',
                }}
                >
                </div>}
                <div className={"table-row"+(theme === 'dark' ? " bg-[#4C7BFE]" : "")
                + (leaderboard[3].selected ? " border-[#4C7BFE] border-[2px]" : "")}
                style={{
                    backgroundColor: theme === 'dark' ? '#4C7BFE' : '#4C7BFE1A',
                    border: leaderboard[3].selected ? '2px solid #4C7BFE' : 'none',
                }}
                >
                    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '0px',
                    }}>
                        <div
                        style={{
                            fontSize: '14px',
                            padding: '0px',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                        >
                            <div
                            style={{
                                color: theme === 'dark' ? '#FFFFFF' : '#000000',
                                fontWeight: 'bold',
                                fontSize: '1em',
                                padding: '0px',
                                marginRight: '10px',
                            }}
                            >
                                {leaderboard[3].rank}
                            </div>
                            <div
                            style={{
                                color: theme === 'dark' ? '#FFFFFF' : '#000000',
                                fontSize: '1em',
                                padding: '0px',
                            }}
                            >
                                {leaderboard[3].school}
                            </div>
                        </div>
                        <div
                        style={{
                            color: theme === 'dark' ? '#FFFFFF' : '#000000',
                            fontSize: '16px',
                            padding: '0px',
                        }}
                        >
                            {leaderboard[3].dq}
                        </div>
                    </div>
                    {
                        leaderboard[3].selected && (
                            <UserBox
                            userstate={userstate}
                            theme={theme}
                            />
                        )
                    }
                </div>
                </>
            )}
            {/* display the last three */}
            { leaderboard[leaderboard.length-1].selected === false ?
            <div
                style={{
                    // border: '2px dotted #4C7BFE',
                    width: '80%',
                    height: '100%',
                    padding: '0px',
                    borderStyle: 'dotted',
                    borderColor: theme === 'dark' ? '#4C7BFE' : '#000000',
                    borderWidth: '2px',
                    borderTop: 'none',
                    borderBottom: 'none',
                }}
                >
            </div> : null }
            {leaderboard.slice(-3).map((item) => (
                <>
                { item.position === 'third-to-last' || item.position === 'second-to-last' || item.position === 'last' ?
                <div className={"table-row"+(theme === 'dark' ? " bg-[#4C7BFE]" : "")
                + (item.selected ? " border-[#4C7BFE] border-[2px]" : "")}
                style={{
                    backgroundColor: theme === 'dark' ? '#4C7BFE' : '#4C7BFE1A',
                    border: item.selected ? '2px solid #4C7BFE' : 'none',
                }}
                >
                    <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '0px',
                    }}>
                        <div
                        style={{
                            fontSize: '14px',
                            padding: '0px',
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                        >
                            <div
                            style={{
                                color: theme === 'dark' ? '#FFFFFF' : '#000000',
                                fontWeight: 'bold',
                                fontSize: '1em',
                                padding: '0px',
                                marginRight: '10px',
                            }}
                            >
                                {item.rank}
                            </div>
                            <div
                            style={{
                                color: theme === 'dark' ? '#FFFFFF' : '#000000',
                                fontSize: '1em',
                                padding: '0px',
                            }}
                            >
                                {item.school}
                            </div>
                        </div>
                        <div
                        style={{
                            color: theme === 'dark' ? '#FFFFFF' : '#000000',
                            fontSize: '16px',
                            padding: '0px',
                        }}
                        >
                            {item.dq}
                        </div>
                    </div>
                    {
                        item.selected && (
                            <UserBox
                            userstate={userstate}
                            theme={theme}
                            />
                        )
                    }
                </div>
                : null }
                </>
            ))}
            {/* { addschool && 
            <div className={"flex flex-row justify-between items-center align-middle w-full px-[15px] bg-blue-500 rounded-md my-[5px] text-white text-[16px] overflow-visible"}>
                <div className="p-0 w-2/5 text-[16px]">
                    Add School
                </div>
                <div className="p-0 w-full">
                    <form className="flex flex-row justify-end items-right p-0">
                        <input className="p-0 rounded-md text-[16px] m-[2px] overflow-scroll px-[5px] text-black placeholder:text-[14px]" placeholder="University Email"/>
                        <button className="p-0 rounded-md bg-white text-blue-500 text-[16px] m-[2px] overflow-visible px-2">+</button>
                    </form>
                </div>
            </div>
            } */}
        </div>
    )
}

const LeaderBoard = ({ overlaybool , setOverlaybool , theme }) => {

    const [addschool, setAddSchool] = useState(true);

    const [navigationdict, setNavigationDict] = useState([
        {name: "Daily", selected: true},
        {name: "Weekly", selected: false},
        // {name: "Lifetime", selected: false},
    ]);

    const [userstate, setUserState] = useState(null)

    const [leaderboard, setLeaderboard] = useState([
        [{school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},],
        [{school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},],
        [{school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false},
        {school: "", dq: '', rank: '', position: '', selected: false}]
    ]);

    // useEffect(() => {
    //     const fetchLeaderBoard = async () => {
    //         const data = await getLeaderBoard()
    //         setUserState(data.data.userstate)
    //         setLeaderboard(data.data.leaderboard)
    //         setAddSchool(data.addschool)
    //     }
    //     fetchLeaderBoard()
    // }
    // , [])

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target === document.getElementsByClassName('modal-overlay')[0]) {

            // ReactGA4.event({
            //     action: 'Info Overlay Click Close',
            //     category: 'Info Overlay',
            //     label: 'Click Info Close',
            //     value: new Date().getTime() - startTime,
            //     });
                
            setOverlaybool(false);
        }
    }

    return (
        <div className={overlaybool ? "modal-overlay" : "modal-overlay-off"} onClick={handleClick}>
            <div className="leaderboard-container"
            style={{
                backgroundColor: theme === 'dark' ? '#252525' : '#FFFFFF',
            }}
            >
                { userstate &&
                <>
                <div className="leaderboard-title">Leaderboard</div>
                <div
                style={{
                    height: '6%',
                    padding: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                    <Navigator
                    navigationdict={navigationdict}
                    setNavigationDict={setNavigationDict}
                    theme={theme}
                    />
                </div>
                <div
                style={{
                    width: '90%',
                    height: '88%',
                    padding: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                    <LeaderTable
                    leaderboard={leaderboard[
                        navigationdict.findIndex((item) => item.selected)
                    ]}
                    userstate={userstate[
                        navigationdict.findIndex((item) => item.selected)
                    ]}
                    addschool={addschool}
                    theme={theme}
                    />
                </div>
                </>}
            </div>
        </div>
    )
}

export default LeaderBoard;