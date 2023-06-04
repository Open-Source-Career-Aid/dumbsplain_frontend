import classNames from "classnames";

function AnswerOptions ({ selectedoption, setSelectedoption, mcqrequested , setSpecial_id , score , setScore , theme , correctoption , setCorrectoption }) {

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
        </>
    );
}

export default AnswerOptions;