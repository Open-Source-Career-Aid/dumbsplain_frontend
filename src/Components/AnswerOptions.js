import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

function AnswerOptions ({ selectedoption, setSelectedoption, mcqrequested , setSpecial_id , score , setScore , theme , correctoption , setCorrectoption }) {

    const [carouseldumbnessLevel, setCarouseldumbnessLevel] = useState(1);
    const [locationofelements, setLocationofelements] = useState(0);
    const [widthofcarouselelement, setWidthofcarouselelement] = useState(0);
    const [widthofcarouselwindow, setWidthofcarouselwindow] = useState(0);

    useEffect(() => {

        const dumbnesscarousel = document.getElementsByClassName('dumbnesscarousel')[0];
        const dumbnesscarouselelement = document.getElementsByClassName('carouseldumbnesslevel')[0];

        setWidthofcarouselelement(dumbnesscarouselelement.offsetWidth);
        setWidthofcarouselwindow(dumbnesscarousel.offsetWidth);

        // eslint-disable-next-line
        if (carouseldumbnessLevel == 1) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2;
            setLocationofelements(initialloc);
        // eslint-disable-next-line
        } else if (carouseldumbnessLevel == 2) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2 - dumbnesscarouselelement.offsetWidth;
            setLocationofelements(initialloc);
        }
        // eslint-disable-next-line
        else if (carouseldumbnessLevel == 3) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2 - dumbnesscarouselelement.offsetWidth*2;
            setLocationofelements(initialloc);
        }
        // eslint-disable-next-line
        else if (carouseldumbnessLevel == 4) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2 - dumbnesscarouselelement.offsetWidth*3;
            setLocationofelements(initialloc);
        }
        // eslint-disable-next-line
        else if (carouseldumbnessLevel == 5) {
            const initialloc = dumbnesscarousel.offsetWidth/2 - dumbnesscarouselelement.offsetWidth/2 - dumbnesscarouselelement.offsetWidth*4;
            setLocationofelements(initialloc);
        }

    }, [widthofcarouselelement, widthofcarouselwindow , carouseldumbnessLevel]);

    const handleLeftSwipe = () => {
        if (!mcqrequested) {
            return;
        }
        const newloc = locationofelements - widthofcarouselelement;
        if (newloc > -widthofcarouselelement*4) {
            setLocationofelements(newloc);
            setCarouseldumbnessLevel(carouseldumbnessLevel + 1);
        }
    }

    const handleRightSwipe = () => {
        if (!mcqrequested) {
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

    useEffect(() => {
        setSelectedoption(carouseldumbnessLevel)
    // eslint-disable-next-line
    }, [carouseldumbnessLevel]);

    const handleDumbclick = (e) => {
        if (mcqrequested) {
            e.preventDefault();
            setSelectedoption(e.currentTarget.getAttribute('value'));
            setCarouseldumbnessLevel(e.currentTarget.getAttribute('value'));
            }
    }

    const handleOptionclick = (e) => {
        // eslint-disable-next-line
        if (mcqrequested === true) {
            e.preventDefault();
            const integervalue = parseInt(e.currentTarget.getAttribute('value'));
            setSelectedoption(integervalue);
        }
    }

    const answeroptions = classNames('answeroptions', {
        // eslint-disable-next-line
        block: correctoption != null
    });

    return (
        <>
            <div className={answeroptions}>

                {/* map from 1-5 for the answer options */}
                {
                    [1,2,3,4,5].map((item) => {
                        return (
                            <div
                            className={classNames('answeroption', {

                                // eslint-disable-next-line
                                selected: selectedoption == item-1 && correctoption == null
                            },
                            {
                                // eslint-disable-next-line
                                wrong: selectedoption == item-1 && correctoption != null && correctoption != item-1
                            },
                            {
                                // eslint-disable-next-line
                                correcthighlight: selectedoption != item-1 && correctoption != null && correctoption == item-1
                            },
                            {
                                // eslint-disable-next-line
                                correct: selectedoption == item-1 && correctoption != null && correctoption == item-1
                            })}
                            onClick={handleOptionclick}
                            value={item-1}
                            key={item}>
                                <div className="bgcontaineranswer"></div>
                                <div className='answeroptiontext' data-theme={theme}>{String.fromCharCode(64+item)}</div>
                            </div>
                        );
                    })
                }
            </div>

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
                                <div 
                                className={classNames('carouseldumbnesslevel', {
                                        // eslint-disable-next-line
                                        selected: selectedoption == dumbnesslevel && correctoption == null
                                    },
                                    {
                                        // eslint-disable-next-line
                                        wrong: selectedoption == dumbnesslevel && correctoption != null && correctoption != dumbnesslevel
                                    },
                                    {
                                        // eslint-disable-next-line
                                        correcthighlight: selectedoption != dumbnesslevel && correctoption != null && correctoption == dumbnesslevel
                                    },
                                    {
                                        // eslint-disable-next-line
                                        correct: selectedoption == dumbnesslevel && correctoption != null && correctoption == dumbnesslevel
                                    })}
                                onClick={handleDumbclick} value={dumbnesslevel}>
                                    <div className="dumbnessleveltext" data-theme={theme}
                                    style={{
                                        position: 'relative',
                                        zIndex: 2,
                                        top: '10%',
                                    }}
                                    >{String.fromCharCode(64+dumbnesslevel)}</div>
                                    <div className="carouselbgcontainer"></div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>   
        </>
    );
}

export default AnswerOptions;