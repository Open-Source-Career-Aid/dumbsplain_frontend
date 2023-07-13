import { useEffect, useState } from "react";
import classNames from 'classnames';
import { avatarlabels } from "../config";

function DumbLevel ({ dumbnessLevel , setDumbnessLevel , explanationrequested , waitfortomorrow , theme , newandupdatedApp }) {

    const [carouseldumbnessLevel, setCarouseldumbnessLevel] = useState(0);
    const [locationofelements, setLocationofelements] = useState(0);
    const [widthofcarouselelement, setWidthofcarouselelement] = useState(0);
    const [widthofcarouselwindow, setWidthofcarouselwindow] = useState(0);

    useEffect(() => {
        const dumbnesscarousel = document.getElementsByClassName('dumbnesscarousel')[0];
        const dumbnesscarouselelement = document.getElementsByClassName('carouseldumbnesslevel')[0];

        setWidthofcarouselelement(dumbnesscarouselelement.offsetWidth);
        setWidthofcarouselwindow(dumbnesscarousel.offsetWidth);

        if(carouseldumbnessLevel >= 1 && carouseldumbnessLevel <= 5){
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth*(0.5 + carouseldumbnessLevel - 1);
            setLocationofelements(initialloc);    
        }

    }, [widthofcarouselelement, widthofcarouselwindow , carouseldumbnessLevel]);    

    useEffect(() => {
        setCarouseldumbnessLevel(dumbnessLevel);
    // eslint-disable-next-line
    }, [dumbnessLevel]);

    // const avatarlabels = ['Just Plain Dumb', 'Not Too Bright', 'Smartass', 'Pretentious Professor', 'Sentient Savant']

    const dumbnesslevels = classNames('dumbnesslevels', {
        greyed: waitfortomorrow
      });

    return (
        <div className={dumbnesslevels}>

            {/* map through 1-5 for the dumblevels */}

            {
                [1, 2, 3, 4, 5].map((dumbnesslevel) => {
                    return (
                        <div
                        className={classNames('dumbnesslevel', {
                            // eslint-disable-next-line
                            selected: dumbnessLevel == dumbnesslevel,
                            // eslint-disable-next-line
                            blocked: (dumbnessLevel != dumbnesslevel && explanationrequested==true) || (newandupdatedApp && dumbnessLevel != dumbnesslevel),
                            // eslint-disable-next-line
                            passed: dumbnessLevel > dumbnesslevel
                            })}
                            value={dumbnesslevel}>
                            <div className="bgcontainer"></div>
                            {/* avatar */}
                            <div className={`avatar${dumbnesslevel}`}></div>
                            {dumbnesslevel === 5 ? 
                            <>
                            <div className="equaltoAI" data-theme={theme}
                            style={{
                                position: 'absolute',
                                zIndex: 1000,
                                fontSize: '0.5rem',
                                top: '30%',
                                right: '5%',
                                fontWeight: 'bold',
                                // color: 'white'
                            }}
                            >=AI</div>
                            </>
                            : null }
                            {/* avatar label */}
                            <div className='avatarlabel' data-theme={theme}>{avatarlabels[dumbnesslevel-1]}</div>
                        </div>
                    )
                })
            }

            <div className="dumbnesscarousel">
                <div className="carouselelementscontainer"
                style={{
                    transform: `translateX(${locationofelements}px)`,
                }}
                >
                {
                    [1, 2, 3, 4, 5].map((dumbnesslevel) => {

                        return (
                            <div 
                            className={
                                classNames('carouseldumbnesslevel', {
                                    // eslint-disable-next-line
                                    selected: dumbnessLevel == dumbnesslevel,
                                    // eslint-disable-next-line
                                    blocked: (dumbnessLevel != dumbnesslevel && explanationrequested==true) || (newandupdatedApp && dumbnessLevel != dumbnesslevel),
                                    // eslint-disable-next-line
                                    passed: dumbnessLevel > dumbnesslevel
                                    })}
                                    value={dumbnesslevel}>
                                <div className="carouselbgcontainer"></div>
                                <div className={`avatar${dumbnesslevel}`}
                                style={{
                                    zIndex: '50'
                                }}
                                ></div>
                                {dumbnesslevel === 5 ? 
                                    <>
                                    <div className="equaltoAI" data-theme={theme}
                                    style={{
                                        position: 'absolute',
                                        zIndex: 1000,
                                        fontSize: '0.5rem',
                                        top: '30%',
                                        right: '5%',
                                        fontWeight: 'bold',
                                        // color: 'white'
                                    }}
                                    >=AI</div>
                                    </>
                                    : null }
                                <div className='avatarlabel' data-theme={theme}
                                style={{
                                    zIndex: '50'
                                }}
                                >{avatarlabels[dumbnesslevel-1]}</div>
                            </div>
                        )
                    })
                }
                </div>
            </div>   
        </div>
    );
}

export default DumbLevel;