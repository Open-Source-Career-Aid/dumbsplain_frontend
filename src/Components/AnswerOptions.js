import { useState } from "react";
import classNames from "classnames";
import submitAnswer from "../Functions/submitAnswer";

function AnswerOptions ({ selectedoption, setSelectedoption, mcqrequested , setSpecial_id , score , setScore , theme }) {

    const [correctoption, setCorrectoption] = useState(null);

    const handleOptionclick = (e) => {
        // eslint-disable-next-line
        if (mcqrequested === true) {
            e.preventDefault();
            const integervalue = parseInt(e.currentTarget.getAttribute('value'));
            setSelectedoption(integervalue);
        }
    }

    const option1 = classNames('answeroption', {
        // eslint-disable-next-line
        selected: selectedoption == 0 && correctoption == null
    },
    {
        // eslint-disable-next-line
        wrong: selectedoption == 0 && correctoption != null && correctoption != 0
    },
    {
        // eslint-disable-next-line
        correcthighlight: selectedoption != 0 && correctoption != null && correctoption == 0
    },
    {
        // eslint-disable-next-line
        correct: selectedoption == 0 && correctoption != null && correctoption == 0
    });

    const option2 = classNames('answeroption', {
        // eslint-disable-next-line
        selected: selectedoption == 1 && correctoption == null
    },
    {
        // eslint-disable-next-line
        wrong: selectedoption == 1 && correctoption != null && correctoption != 1
    },
    {
        // eslint-disable-next-line
        correcthighlight: selectedoption != 1 && correctoption != null && correctoption == 1
    },
    {
        // eslint-disable-next-line
        correct: selectedoption == 1 && correctoption != null && correctoption == 1
    });

    const option3 = classNames('answeroption', {
        // eslint-disable-next-line
        selected: selectedoption == 2 && correctoption == null
    },
    {
        // eslint-disable-next-line
        wrong: selectedoption == 2 && correctoption != null && correctoption != 2
    },
    {
        // eslint-disable-next-line
        correcthighlight: selectedoption != 2 && correctoption != null && correctoption == 2
    },
    {
        // eslint-disable-next-line
        correct: selectedoption == 2 && correctoption != null && correctoption == 2
    });

    const option4 = classNames('answeroption', {
        // eslint-disable-next-line
        selected: selectedoption == 3 && correctoption == null
    },
    {
        // eslint-disable-next-line
        wrong: selectedoption == 3 && correctoption != null && correctoption != 3
    },
    {
        // eslint-disable-next-line
        correcthighlight: selectedoption != 3 && correctoption != null && correctoption == 3
    },
    {
        // eslint-disable-next-line
        correct: selectedoption == 3 && correctoption != null && correctoption == 3
    });

    const option5 = classNames('answeroption', {
        // eslint-disable-next-line
        selected: selectedoption == 4 && correctoption == null
    },
    {
        // eslint-disable-next-line
        wrong: selectedoption == 4 && correctoption != null && correctoption != 4
    },
    {
        // eslint-disable-next-line
        correcthighlight: selectedoption != 4 && correctoption != null && correctoption == 4
    },
    {
        // eslint-disable-next-line
        correct: selectedoption == 4 && correctoption != null && correctoption == 4
    });

    const answeroptions = classNames('answeroptions', {
        // eslint-disable-next-line
        block: correctoption != null
    });

    const handleAnswersubmit = (e) => {
        if (selectedoption !== null) {
            e.preventDefault();
            async function fetchAnswer() {
                const answer = await submitAnswer(selectedoption+1);
                setCorrectoption(answer.correctoption-1);
                setSpecial_id(answer.special_id);
                setScore(answer.score);
            }
            fetchAnswer();
        }
    }

    return (
        <>
            <div className={answeroptions}>
                <div className={option1}
                onClick={handleOptionclick}
                value={0}>
                    <div className='answeroptiontext' data-theme={theme}>A</div>
                </div>
                <div className={option2}
                onClick={handleOptionclick}
                value={1}>
                    <div className='answeroptiontext' data-theme={theme}>B</div>
                </div>
                <div className={option3}
                onClick={handleOptionclick}
                value={2}>
                    <div className='answeroptiontext' data-theme={theme}>C</div>
                </div>
                <div className={option4}
                onClick={handleOptionclick}
                value={3}>
                    <div className='answeroptiontext' data-theme={theme}>D</div>
                </div>
                <div className={option5}
                onClick={handleOptionclick}
                value={4}>
                    <div className='answeroptiontext' data-theme={theme}>E</div>
                </div>
            </div>
            { selectedoption !== null && correctoption == null ?
                <div className='buttoncontainer'>
                    <div className='dumbsplainbutton' onClick={handleAnswersubmit}>
                        <div className='dumbsplainbuttontext'>Submit</div>
                    </div>
                </div>
                : null}
        </>
    );
}

export default AnswerOptions;