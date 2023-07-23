import '../CSS/PlayerProgress.css'
import React , { useEffect , useState } from 'react';

export default function PlayerProgress({ dq , score , add , sub , setAdd , setSub }) {

    const [fontcolor1, setFontColor1] = useState('#B1B1B1')
    const [fontcolor2, setFontColor2] = useState('#B1B1B1')
    const [num, setNum] = useState(0)
    const [num2, setNum2] = useState(0)
    const [positive, setPositive] = useState(false)
    const [negative, setNegative] = useState(false)

    // useEffect(() => {

    //     if (add!==0) {
    //         setPositive(true)
    //     }

    //     if (sub!==0) {
    //         setNegative(true)
    //     }

    // }, [add, sub])

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

    useEffect(() => {

        if (positive) {
            setTimeout(() => {
                setPositive(false)
                setAdd(0)
            }, 3000);
        }

        if (negative) {
            setTimeout(() => {
                setNegative(false)
                setSub(0)
            }, 3000);
        }

    }, [positive, negative, setAdd, setSub])

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
            {/* <div className={"addsomething"
            + (positive ? ' fade-in' : ' fade-out')
            }>
                {add}
            </div>
            <div className={"subsomething"
            + (negative ? ' fade-in' : ' fade-out')
            }>
                {sub}
            </div> */}
        </div>
    );
    }