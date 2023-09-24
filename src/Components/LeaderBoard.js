import { useState , useEffect } from "react";
import getLeaderBoard from "../Functions/getLeaderBoard";
// import { set } from "react-ga";

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
        <div className="flex flex-row w-full p-0">
            {/* map the items in navigationdict and based on if item.selected is true, highlight it */}
            {navigationdict.map((item) => (
                <div className="flex flex-col justify-center items-center align-middle w-[100px] rounded-md w-full p-0">
                    <div className=
                    {(item.selected ? "bg-[#8CA8FF] text-white" : "bg-transparent hover:bg-[#4C7BFE1A]") + " text-[16px] rounded-md cursor-pointer"+
                    (theme === 'dark' ? " text-white" : "")
                    }
                    onClick={() => handleClick(navigationdict.indexOf(item))}
                    >{item.name}</div>
                </div>
            ))}
        </div>
    )
}

const UserBox = ({ userstate , theme }) => {

    return (
        <>
        <div className="flex flex-row p-0 justify-between text-[14px] pb-[5px]">
            <div className={"font-bold text-[1em] p-0" +
            (theme === 'dark' ? " text-white" : " text-[#4C7BFE]")
            }>
                {/* User: {userstate.id} */}
                You
            </div>
            <div className={"font-bold text-[1em] p-0" +
            (theme === 'dark' ? " text-white" : " text-[#4C7BFE]")
            }>
                School Rank: {userstate.schoolrank}
            </div>
            <div className={"font-bold text-[1em] p-0"
            + (theme === 'dark' ? " text-white" : " text-[#4C7BFE]")
            }>
                DQ: {userstate.dq}
            </div>
        </div>
        </>
    )
}

const LeaderTable = ({ leaderboard , userstate , theme , addschool }) => {

    return (
        <div className="flex flex-col w-full p-0 py-2 h-[100%] justify-between items-center">
            {/* display the first three items in leaderboard */}
            <div className="p-0 w-full overflow-visible">
            {leaderboard.slice(0, 3).map((item) => (
                <>
                { item.position === 'first' || item.position === 'second' || item.position === 'third' ?
                <div className={"flex flex-col w-full px-[15px] bg-[#4C7BFE1A] rounded-md my-[5px] text-[16px] overflow-visible"+(theme === 'dark' ? " bg-[#4C7BFE]" : "")
                + (item.selected ? " border-[#4C7BFE] border-[2px]" : "")}>
                    <div className="flex flex-row p-0 justify-between">
                        <div className="text-[14px] p-0 flex flex-row">
                            <div className={"text-black font-bold text-[1em] p-0 mr-[10px]"+
                            (theme === 'dark' ? " text-white" : "")
                            }>
                                {item.rank}
                            </div>
                            <div className={"text-black-500 text-[1em] p-0 dark:text-white"+
                            (theme === 'dark' ? " text-white" : "")
                            }>
                                {item.school}
                            </div>
                        </div>
                        <div className={"text-[16px] p-0 dark:text-white"+
                        (theme === 'dark' ? " text-white" : "")
                        }>
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
            </div>
            {/* display the fourth if position is middle */}
            {leaderboard[3].position === 'middle' && (
                <>
                { leaderboard[0].selected === false &&    
                <div className={"w-[80%] p-0 border-x-[2px] border-dotted h-full"+
                (theme === 'dark' ? " border-[#4C7BFE]" : " border-black")
                }>
                </div>}
                <div className={"flex flex-col w-full px-[15px] bg-[#4C7BFE1A] rounded-md my-[5px] text-[16px] overflow-visible" + (theme === 'dark' ? " bg-[#4C7BFE]" : "")
                + (leaderboard[3].selected ? " border-[#4C7BFE] border-[2px]" : "")}>
                    <div className="flex flex-row p-0 justify-between">
                        <div className="text-[14px] p-0 flex flex-row">
                            <div className={"font-bold text-[1em] p-0 mr-[10px]"+
                            (theme === 'dark' ? " text-white" : " text-black")
                            }>
                                {leaderboard[3].rank}
                            </div>
                            <div className={"text-[1em] p-0"
                            + (theme === 'dark' ? " text-white" : " text-black")
                            }>
                                {leaderboard[3].school}
                            </div>
                        </div>
                        <div className={"text-[16px] p-0"+
                        (theme === 'dark' ? " text-white" : " text-black")
                        }>
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
            <div className={"w-[80%] p-0 border-x-[2px] border-dotted h-full"+
            (theme === 'dark' ? " border-[#4C7BFE]" : " border-black")
            }>
            </div> : null }
            {leaderboard.slice(-3).map((item) => (
                <>
                { item.position === 'third-to-last' || item.position === 'second-to-last' || item.position === 'last' ?
                <div className={"flex flex-col w-full px-[15px] bg-[#4C7BFE1A] rounded-md my-[5px] text-[16px] overflow-visible"+(theme === 'dark' ? " bg-[#4C7BFE]" : "")
                + (item.selected ? " border-[#4C7BFE] border-[2px]" : "")}>
                    <div className="flex flex-row p-0 justify-between">
                        <div className="text-[14px] p-0 flex flex-row">
                            <div className={"text-black font-bold text-[1em] p-0 mr-[10px]"
                            + (theme === 'dark' ? " text-white" : "")
                            }>
                                {item.rank}
                            </div>
                            <div className={"text-black-500 text-[1em] p-0 "
                            + (theme === 'dark' ? " text-white" : "")
                            }>
                                {item.school}
                            </div>
                        </div>
                        <div className={"text-[16px] p-0"+
                        (theme === 'dark' ? " text-white" : "")
                        }>
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
        {name: "Lifetime", selected: false},
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

    useEffect(() => {
        const fetchLeaderBoard = async () => {
            const data = await getLeaderBoard()
            setUserState(data.data.userstate)
            setLeaderboard(data.data.leaderboard)
            setAddSchool(data.addschool)
        }
        fetchLeaderBoard()
    }
    , [])

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
            <div className={"flex flex-col justify-start items-center align-middle w-[400px] h-[600px] bg-white rounded-md p-[20px]"+
            (theme === 'dark' ? " bg-[#252525]" : "")
            }>
                { userstate &&
                <>
                <div className="mb-[10px] text-[20px] h-[6%] font-bold text-[#4C7BFE]">Leaderboard</div>
                <div className="w-full p-0 h-[6%]">
                    <Navigator
                    navigationdict={navigationdict}
                    setNavigationDict={setNavigationDict}
                    theme={theme}
                    />
                </div>
                <div className="w-full p-0 h-[88%]">
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