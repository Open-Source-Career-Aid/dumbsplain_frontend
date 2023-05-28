import React, { useEffect, useState } from 'react';

function WaitingBox({ waitingtime , theme }) {

    // convert waiting time into hours, minutes, seconds
    const [hours, setHours] = useState(Math.floor(waitingtime / 3600));
    const [minutes, setMinutes] = useState(Math.floor((waitingtime % 3600) / 60));
    const [seconds, setSeconds] = useState(waitingtime % 60);

    useEffect(() => {

        setHours(Math.floor(waitingtime / 3600));
        setMinutes(Math.floor((waitingtime % 3600) / 60));
        setSeconds(waitingtime % 60);

    }, [waitingtime]);

    // update the time every second
    setTimeout(() => {
        if (seconds > 0) {
            setSeconds(seconds - 1);
        }
        else if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
        }
        else if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
        }
    }, 1000);

    // format the time, use different name for hours, minutes, seconds as they are already used
    const time = `${hours} h ${minutes} m ${seconds} s`;

    return (
        <div className="waitingbox">
            <div className='waitingarea'>
                <p className="waitingtext" data-theme={theme}>
                    You already answered the question for today, dummy! Come back in...
                </p>
                <p className="waitingtime">
                    {time}
                </p>
            </div>
        </div>
    )
}

export default WaitingBox