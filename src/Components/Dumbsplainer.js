import React from 'react';

// function that takes in a text finds the question surounded by <q> and </q> and 5 options surounded by <o> and </o>
// and returns an array of the question and the options
function getQuestionAndOptions ({ text , theme }) {

    let question = '';
    let options = [];
    let option = '';
    let optioncount = 0;
    let optionflag = false;
    let questionflag = false;

    for (let i = 0; i < text.length; i++) {
        
        if (text[i] === '<' && text[i + 1] === 'q' && text[i + 2] === '>') {   
            questionflag = true;
            i += 2;
        }
        else if (text[i] === '<' && text[i + 1] === '/' && text[i + 2] === 'q' && text[i + 3] === '>') {
            questionflag = false;
            i += 3;
        }
        else if (text[i] === '<' && text[i + 1] === 'o' && text[i + 2] === '>') {
            optionflag = true;
            i += 2;
        }
        else if (text[i] === '<' && text[i + 1] === '/' && text[i + 2] === 'o' && text[i + 3] === '>') {
            optionflag = false;
            options.push(option);
            option = '';
            // eslint-disable-next-line
            optioncount++;
            i += 3;
        }
        else if (questionflag === true) {
            question += text[i];
        }
        else if (optionflag === true) {
            option += text[i];
        }
    }

    return (
        <>
            <div className='mcq-question' data-theme={theme}>
                {/* <p data-theme={theme}>  */}
                {question} 
                {/* </p> */}
            </div>
            <div className='mcq-options'>
                <ol>
                    {options.map((option, index) => {
                        return (
                                <li className='mcq-option' key={index} data-theme={theme}> {option} </li>
                        )
                    })}
                </ol>
            </div>
        </>
    )
}

function Dumbsplainer ({ text , quizme , theme }) {

    return (
        <>
            <div className='explanationcontainer'>
                <div className='textarea'>
                    { quizme ? getQuestionAndOptions({ text , theme }) :
                    <p data-theme={theme}>
                        {text}
                    </p>}
                </div>
            </div>
        </>
    );
}

export default Dumbsplainer;