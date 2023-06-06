import { useEffect, useState } from "react";
import classNames from 'classnames';
import { useSwipeable } from "react-swipeable";

export default function Carousel({ carouseldumbnessLevel , setCarouseldumbnessLevel }) {

    const [locationofelements, setLocationofelements] = useState(0);
    const [widthofcarouselelement, setWidthofcarouselelement] = useState(0);
    const [widthofcarouselwindow, setWidthofcarouselwindow] = useState(0);

    useEffect(() => {

        const dumbnesscarousel = document.getElementsByClassName('dumbnesscarousel')[0];
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

    return (
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
                                {props.children}
                            </div>
                        )
                    })
                }
                </div>
            </div>
    )
}