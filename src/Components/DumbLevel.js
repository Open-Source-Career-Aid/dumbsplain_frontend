import { useEffect, useState } from "react";
import classNames from 'classnames';
import { useSwipeable } from "react-swipeable";

function DumbLevel ({ dumbnessLevel , setDumbnessLevel , explanationrequested , waitfortomorrow , theme }) {

    const [carouseldumbnessLevel, setCarouseldumbnessLevel] = useState(1);
    const [locationofelements, setLocationofelements] = useState(0);
    const [widthofcarouselelement, setWidthofcarouselelement] = useState(0);
    const [widthofcarouselwindow, setWidthofcarouselwindow] = useState(0);

    useEffect(() => {

        const dumbnesscarousel = document.getElementsByClassName('dumbnesscarousel')[0];
        const dumbnesscarouselelements = document.getElementsByClassName('carouseldumbnesslevel');
        const dumbnesscarouselelement = document.getElementsByClassName('carouseldumbnesslevel')[0];

        setWidthofcarouselelement(dumbnesscarouselelement.offsetWidth);
        setWidthofcarouselwindow(dumbnesscarousel.offsetWidth);

        if (carouseldumbnessLevel == 1) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2;
            setLocationofelements(initialloc);
        } else if (carouseldumbnessLevel == 2) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2 - dumbnesscarouselelement.offsetWidth;
            setLocationofelements(initialloc);
        }
        else if (carouseldumbnessLevel == 3) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2 - dumbnesscarouselelement.offsetWidth*2;
            setLocationofelements(initialloc);
        }
        else if (carouseldumbnessLevel == 4) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2 - dumbnesscarouselelement.offsetWidth*3;
            setLocationofelements(initialloc);
        }
        else if (carouseldumbnessLevel == 5) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2 - dumbnesscarouselelement.offsetWidth*4;
            setLocationofelements(initialloc);
        }

    }, [widthofcarouselelement, widthofcarouselwindow , carouseldumbnessLevel]);

    useEffect(() => {
        setDumbnessLevel(carouseldumbnessLevel);
    // eslint-disable-next-line
    }, [carouseldumbnessLevel]);

    const handleLeftSwipe = () => {
        if (explanationrequested) {
            return;
        }
        const newloc = locationofelements - widthofcarouselelement;
        if (newloc > -widthofcarouselelement*4) {
            setLocationofelements(newloc);
            setCarouseldumbnessLevel(carouseldumbnessLevel + 1);
        }
    }

    const handleRightSwipe = () => {
        if (explanationrequested) {
            return;
        }
        const newloc = locationofelements + widthofcarouselelement;
        if (newloc <= widthofcarouselwindow/2 - widthofcarouselelement/2) {
            setLocationofelements(newloc);
            setCarouseldumbnessLevel(carouseldumbnessLevel - 1);
        }
    }

    const handlers = useSwipeable({

        onSwipedLeft: () => handleLeftSwipe(),
        onSwipedRight: () => handleRightSwipe(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true

    });

    const handleDumbclick = (e) => {
        if (!explanationrequested) {
            e.preventDefault();
            setDumbnessLevel(e.currentTarget.getAttribute('value'));
            setCarouseldumbnessLevel(e.currentTarget.getAttribute('value'));
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

            <div className="dumbnesscarousel"
            {...handlers}
            >
                <div className="carouselelementscontainer"
                style={{
                    transform: `translateX(${locationofelements}px)`,
                }}
                >
                {
                    [1,2,3,4,5].map((dumbnesslevel) => {

                        return (
                            <div className="carouseldumbnesslevel" onClick={handleDumbclick} value={dumbnesslevel}>
                                <div className="carouselbgcontainer"></div>
                                <div className={'avatar' + dumbnesslevel}
                                ></div>
                                <div className='avatarlabel'>{avatarlabels[dumbnesslevel-1]}</div>
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