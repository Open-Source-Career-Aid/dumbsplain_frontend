import '../CSS/PlayerProgress.css'
import React , { useEffect , useState } from 'react';

export default function PlayerProgress({ dq , score }) {

    const [fontcolor1, setFontColor1] = useState('#B1B1B1')
    const [fontcolor2, setFontColor2] = useState('#B1B1B1')
    const [num, setNum] = useState(0)
    const [num2, setNum2] = useState(0)

    useEffect(() => {

        if (fontcolor1==='#32BCA3' || fontcolor2==='#F59E6C') {
            setTimeout(() => {
                setFontColor1('#B1B1B1')
            }, 3000);
        }

        if (fontcolor2==='#32BCA3' || fontcolor2==='#F59E6C') {
            setTimeout(() => {
                setFontColor2('#B1B1B1')
            }, 3000);
        }

    }, [fontcolor1, fontcolor2])

    useEffect(() => {

        if (dq > num) {
            setFontColor1('#32BCA3')
            setNum(dq)
        }
        else if (dq < num) {
            setFontColor1('#F59E6C')
            setNum(dq)
        }

    }, [dq, num])

    useEffect(() => {

        if (score > num2) {
            setFontColor2('#32BCA3')
            setNum2(score)
        }
        else if (score < num2) {
            setFontColor2('#F59E6C')
            setNum2(score)
        }

    }, [score, num2])

    return (
        <div className='progresscontainer' style={{
            padding: '0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'end',
            overflow: 'visible',
        }}>
            <div className="progresstitle">DQ:</div>
            <div className="progressscore"
            style={{
                color: fontcolor1,
            }}
            >{dq}</div>
            <div className="progresstitle"
            style={{
                marginLeft: '20px',
            }}
            >Score:</div>
            <div className="progressscore"
            style={{
                color: fontcolor2,
            }}
            >{score}</div>
        </div>
    );
    }