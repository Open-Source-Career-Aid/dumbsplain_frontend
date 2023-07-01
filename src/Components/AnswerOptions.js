import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

function AnswerOptions ({ selectedoption, setSelectedoption, mcqrequested , setSpecial_id , score , setScore , theme , correctoption , setCorrectoption }) {

    const [carouseldumbnessLevel, setCarouseldumbnessLevel] = useState(1);
    const [locationofelements, setLocationofelements] = useState(0);
    const [widthofcarouselelement, setWidthofcarouselelement] = useState(0);
    const [widthofcarouselwindow, setWidthofcarouselwindow] = useState(0);

    // useEffect(() => {

        // if (selectedoption === 1 && correctoption === null) {
        //     console.log("test 2");
        //     setCarouseldumbnessLevel(1);
        // }

    // }, [correctoption, selectedoption]);

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
        if (newloc > widthofcarouselwindow/2-widthofcarouselelement*5) {
            setLocationofelements(newloc);
            setCarouseldumbnessLevel(carouseldumbnessLevel + 1);
            console.log(carouseldumbnessLevel);
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
            const integervalue = parseInt(e.currentTarget.getAttribute('value'));
            setSelectedoption(integervalue);
            setCarouseldumbnessLevel(integervalue);
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

    const carouselelementscontainer = classNames('carouselelementscontainer', {
        // eslint-disable-next-line
        block: correctoption != null
    });

    return (
        <>
            <div className={answeroptions}>

                {/* map from 1-5 for the answer options */}
                {
                    [1, 2, 3, 4, 5].map((item) => {
                        return (
                            <div
                            className={classNames('answeroption', {

                                // eslint-disable-next-line
                                selected: selectedoption == item && correctoption == null
                            },
                            {
                                // eslint-disable-next-line
                                wrong: selectedoption == item && correctoption != null && correctoption != item
                            },
                            {
                                // eslint-disable-next-line
                                correcthighlight: selectedoption != item && correctoption != null && correctoption == item
                            },
                            {
                                // eslint-disable-next-line
                                correct: selectedoption == item && correctoption != null && correctoption == item
                            })}
                            onClick={handleOptionclick}
                            value={item}
                            key={item}>
                                <div className="bgcontaineranswer" key={`${item}1`}></div>
                                <div className='answeroptiontext' key={`${item}2`} data-theme={theme}>{item}</div>
                            </div>
                        );
                    })
                }
                 <div className="dumbnesscarousel"
                {...handlers}
                >
                    <div className={carouselelementscontainer}
                    style={{
                        transform: `translateX(${locationofelements}px)`,
                    }}
                    >
                    {
                        [1, 2, 3, 4, 5].map((dumbnesslevel) => {

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
                                    >{dumbnesslevel}</div>
                                    <div className="carouselbgcontainer"></div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>   
            </div>
        </>
    );
}

export default AnswerOptions;