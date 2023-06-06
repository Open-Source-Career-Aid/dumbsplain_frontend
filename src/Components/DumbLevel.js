import { useEffect, useState } from "react";
import classNames from 'classnames';

function DumbLevel ({ dumbnessLevel , setDumbnessLevel , explanationrequested , waitfortomorrow , theme }) {

    const [carouseldumbnessLevel, setCarouseldumbnessLevel] = useState(1);

    useEffect(() => {

        setDumbnessLevel(carouseldumbnessLevel);

    // eslint-disable-next-line
    }, [carouseldumbnessLevel]);

    const handleDumbclick = (e) => {
        if (!explanationrequested) {
            e.preventDefault();
            setDumbnessLevel(e.currentTarget.getAttribute('value'));
            }
    }

    const avatarlabels = ['Just Plain Dumb', 'Not Too Bright', 'Average Joe', 'Smartass', 'Pretentious Professor']

    const dumbnesslevels = classNames('dumbnesslevels', {
        greyed: waitfortomorrow
      });

    const handleDumbnesscarouselChange = (e) => {
        if (!explanationrequested) {
            e.preventDefault();
            if (carouseldumbnessLevel + parseInt(e.currentTarget.getAttribute('value')) > 0 && carouseldumbnessLevel + parseInt(e.currentTarget.getAttribute('value')) <= 5) {
                setCarouseldumbnessLevel(carouseldumbnessLevel + parseInt(e.currentTarget.getAttribute('value')));
            }

        }
    }

    return (
        <div className={dumbnesslevels}>

            {/* map through 1-5 for the dumblevels */}

            {
                [1,2,3,4,5].map((dumbnesslevel) => {
                    return (
                        <div
                        className={classNames('dumbnesslevel', {
                            // eslint-disable-next-line
                            selected: dumbnessLevel == dumbnesslevel, greyed: dumbnessLevel != dumbnesslevel && dumbnessLevel != null
                            })}
                        onClick={handleDumbclick} value={dumbnesslevel}>
                            <div className="bgcontainer"></div>
                            {/* avatar */}
                            <div className={`avatar${dumbnesslevel}`}></div>
                            {/* avatar label */}
                            <div className='avatarlabel' data-theme={theme}>{avatarlabels[dumbnesslevel-1]}</div>
                        </div>
                    )
                })
            }

            <div className="dumbnesscarousel">
                {/* <div className="leftarrow" onClick={handleDumbnesscarouselChange} value={-1}></div> */}
                {
                    [1,2,3,4,5].map((dumbnesslevel) => {

                        return (
                            <div className="carouseldumbnesslevel">
                                <div className="carouselbgcontainer"></div>
                                <div className={'avatar' + dumbnesslevel}
                                style={{
                                    position: 'absolute',
                                    top: '0',
                                    width: '70%',
                                    height: '70%',
                                    zIndex: '5',
                                }}
                                ></div>
                                <div className='avatarlabel'
                                style={{
                                    position: 'absolute',
                                    zIndex: '5',
                                    bottom: '5%',
                                    padding: '4% 0',
                                }}
                                >{avatarlabels[dumbnesslevel-1]}</div>
                            </div>
                        )
                    })
                }
                    {/* <div className="carouseldumbnesslevel">
                        <div className="carouselbgcontainer"></div>
                        <div className={'avatar' + carouseldumbnessLevel}
                        style={{
                            position: 'absolute',
                            top: '0',
                            width: '70%',
                            height: '70%',
                            zIndex: '5',
                        }}
                        ></div>
                        <div className='avatarlabel'
                        style={{
                            position: 'absolute',
                            zIndex: '5',
                            bottom: '5%',
                            padding: '4% 0',
                        }}
                        >{avatarlabels[carouseldumbnessLevel-1]}</div>
                    </div>   */}
                {/* <div className="rightarrow" onClick={handleDumbnesscarouselChange} value={1}></div> */}
            </div>   
        </div>
    );
}

export default DumbLevel;