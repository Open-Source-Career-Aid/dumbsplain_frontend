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

    const dumblevel1 = classNames('dumbnesslevel', {
        // eslint-disable-next-line
        selected: dumbnessLevel == 1, greyed: dumbnessLevel != 1 && dumbnessLevel != null
      });

    const dumblevel2 = classNames('dumbnesslevel', {
        // eslint-disable-next-line
        selected: dumbnessLevel == 2, greyed: dumbnessLevel != 2 && dumbnessLevel != null
      });

    const dumblevel3 = classNames('dumbnesslevel', {
        // eslint-disable-next-line
        selected: dumbnessLevel == 3, greyed: dumbnessLevel != 3 && dumbnessLevel != null
      });
    
    const dumblevel4 = classNames('dumbnesslevel', {
        // eslint-disable-next-line
        selected: dumbnessLevel == 4, greyed: dumbnessLevel != 4 && dumbnessLevel != null
      });
    
    const dumblevel5 = classNames('dumbnesslevel', {
        // eslint-disable-next-line
        selected: dumbnessLevel == 5, greyed: dumbnessLevel != 5 && dumbnessLevel != null
      });

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
            <div 
            className={dumblevel1}
            onClick={handleDumbclick} value={1}>
                <div className="bgcontainer"></div>
                {/* avatar */}
                <div className='avatar1'></div>
                {/* avatar label */}
                <div className='avatarlabel' data-theme={theme}>{avatarlabels[0]}</div>
            </div>
            <div 
            className={dumblevel2}
            onClick={handleDumbclick} value={2}>
                <div className="bgcontainer"></div>
                {/* avatar */}
                <div className='avatar2'></div>
                {/* avatar label */}
                <div className='avatarlabel' data-theme={theme}>{avatarlabels[1]}</div>
            </div>
            <div 
            className={dumblevel3}
            onClick={handleDumbclick} value={3}>
                <div className="bgcontainer"></div>
                {/* avatar */}
                <div className='avatar3'></div>
                {/* avatar label */}
                <div className='avatarlabel' data-theme={theme}>{avatarlabels[2]}</div>
            </div>
            <div 
            className={dumblevel4}
            onClick={handleDumbclick} value={4}>
                <div className="bgcontainer"></div>
                {/* avatar */}
                <div className='avatar4'></div>
                {/* avatar label */}
                <div className='avatarlabel' data-theme={theme}>{avatarlabels[3]}</div>
            </div>
            <div 
            className={dumblevel5}
            onClick={handleDumbclick} value={5}>
                <div className="bgcontainer"></div>
                {/* avatar */}
                <div className='avatar5'></div>
                {/* avatar label */}
                <div className='avatarlabel' data-theme={theme}>{avatarlabels[4]}</div>
            </div>
            <div className="dumbnesscarousel">
                <div className="leftarrow" onClick={handleDumbnesscarouselChange} value={-1}></div>
                <div className="carouseldumbnesslevel">
                    <div className="carouselbgcontainer"></div>
                    <div className={'avatar' + carouseldumbnessLevel}></div>
                    <div className='avatarlabel'>{avatarlabels[carouseldumbnessLevel-1]}</div>
                </div>  
                <div className="rightarrow" onClick={handleDumbnesscarouselChange} value={1}></div>
            </div>   
        </div>
    );
}

export default DumbLevel;