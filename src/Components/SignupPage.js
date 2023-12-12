import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import "../CSS/SignupPage.css"

export default function SignupPage() {

    const [showLanding, setShowLanding] = useState(true)
    const [showEdu, setShowEdu] = useState(false)
    const [showOtherSignup, setShowOtherSignup] = useState(false)
    // state to show .edu?
    // state to show .edu login?
    const [signUpSuccess, setSignUpSuccess] = useState(false)
    // state to show congratulations?

    // confetti state & application
    const { width , height } = useWindowSize()
    const [confetti, setConfetti] = React.useState(false);
    const [confettiamount, setConfettiamount] = React.useState(500);

    const handleConfetticomplete = () => {
        setConfetti(false);
        setConfettiamount(0);
    }

    const handleYesClick = () => {
        console.log('yes clicked')
        setShowLanding(false)
        setShowEdu(true)
    }

    const handleNoClick = () => {
        console.log('no clicked')
        setShowLanding(false)
        setShowOtherSignup(true)
    }

    const handleBack = () => {
        console.log('back clicked')
        setShowLanding(true)
        setShowEdu(false)
        setShowOtherSignup(false)
    }

    // password validation
    const passwordValidator = require('password-validator')

    // creating password schema
    const schema = new passwordValidator()
    schema
        // .is().min(8)
        // .is().max(100)
        // .has().uppercase()
        .has().uppercase(1, 'Password must contain at least one uppercase letter.')
        .has().lowercase()
        .has().digits(2)
        .has().not().spaces()
        .is().not().oneOf(['Passw0rd', 'Password123']) // Blacklist these values

        // schema.not().min(8, 'Password must have at least 8 characters.')
        // schema.not().max(100, 'Password cannot exceed 100 characters.')
        // schema.not().uppercase(1, 'Password must contain at least one uppercase letter.')
        // schema.not().lowercase(1, 'Password must contain at least one lowercase letter.')
        // schema.not().digits(2,'Password must contain at least two digits.')
        // schema.not().spaces(0, 'Password cannot contain spaces.')
        // schema.not().oneOf ('Password cannot be common or easy to guess.')

    const validatePasswordWithDetails = (password) => {
        return schema.validate(password, { list: true, details: true })
    }

    // state for passwords matching & validated
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [validationDetails, setValidationDetails] = useState([]);

    // state for .edu sign up form
    const initialEduState = {
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    const [eduFormData, setEduFormData] = useState(initialEduState);

    // state for valid email
    const [validEmail, setValidEmail] = useState(null)

    // helper function to check if email is .edu
    const isEmailEdu = (email) => {
        const emailDomain = email.split('@')[1]
        return emailDomain.includes('.edu')
    }

    // helper functions for .edu input
    const handleEduChange = (e) => {
        setEduFormData({...eduFormData, [e.target.id]: e.target.value});
    }

    // .edu handle submit
    const handleEduSubmit = (e) => {
        e.preventDefault()
        const email = eduFormData.email
        if (isEmailEdu(email)) {
            console.log('valid .edu email')
            setValidEmail(true)
            console.log(eduFormData)
            setShowEdu(false)
            // add set other sign up page to false
            setSignUpSuccess(true)
            setConfetti(true)
        } else {
            console.log('invalid .edu email')
            setValidEmail(false)
        }
    }

    // state for other signup form
    const initialOtherState = {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    }
    const [otherFormData, setOtherFormData] = useState(initialOtherState);

    // helper function for other input
    const handleOtherChange = (e) => {
        setOtherFormData({...otherFormData, [e.target.id]: e.target.value})

        if (e.target.id === 'password') {
            setPasswordValid(schema.validate(e.target.value))
            console.log('password valid', passwordValid)

            const details = validatePasswordWithDetails(e.target.value)
            setValidationDetails(details)

            setPasswordsMatch(e.target.value === otherFormData.confirm_password);

            if (validationDetails.length > 0) {
                // console.log('validation details', validationDetails)
            }
        }
        else if (e.target.id === 'confirm_password') {
            setPasswordsMatch(e.target.value === otherFormData.password)
        }
    }

    // other signup form handle submit
    const handleOtherSubmit = (e) => {
        e.preventDefault()
        const passwordValid = schema.validate(otherFormData.password);
        if (passwordValid && passwordsMatch) {
        // if (passwordsMatch) {
            console.log(otherFormData)
            setShowOtherSignup(false)
            setSignUpSuccess(true)
        } else {
            console.log('passwords don`t match or passwords invalid')
        }
    }

    if(showLanding) return (
        <div>
            <h1 className="tw-font-bold tw-text-center tw-mb-6 tw-mt-8">
                Do you have an .edu email address?
            </h1>
            <button onClick={handleYesClick} className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-full tw-lg:w-auto tw-my-2">
                Yes
            </button>
            <button onClick={handleNoClick} className="tw-rounded-xl tw-bg-white hover:tw-bg-orange_200 hover:tw-text-white hover:tw-border-orange_200 tw-border tw-border-blue_400 tw-w-full tw-lg:w-auto">
                No
            </button>
        </div>
    )

    if(showEdu) return (
        <div className="tw-flex tw-justify-center tw-p-20">
            <div className="tw-w-full tw-max-w-md">
                <h1 className="tw-font-bold tw-text-center tw-mb-6 tw-mt-8">
                    Please sign up with your .edu email address.
                </h1>
                <form onSubmit={handleEduSubmit} className="tw-flex tw-flex-col tw-items-center">
                    <div className="tw-my-2 tw-w-full">
                        <label className="tw-font-bold tw-text-xs">Name</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-mt-1"
                            id="name"
                            type="text"
                            placeholder="Helena Bonham Carter"
                            onChange={handleEduChange}
                        />
                    </div>
                    <div className="tw-my-2 tw-w-full">
                        <label className="tw-font-bold tw-text-xs">Email</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-mt-1"
                            id="email"
                            type="text"
                            placeholder="hcarter@university.edu"
                            onChange={handleEduChange}
                        />
                    </div>
                    { validEmail === false ? <h2>invalid</h2> : null}
                    <div className="tw-my-2 tw-w-full">
                        <label className="tw-font-bold tw-text-xs">Password</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-mt-1"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleEduChange}
                        />
                    </div>
                    <div className="tw-my-2 tw-w-full">
                        <label className="tw-font-bold tw-text-xs">Confirm Password</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-mt-1"
                            id="confirm_password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleEduChange}
                        />
                    </div>
                    <div className="tw-w-full">
                        <button className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-full tw-my-2" type="submit">
                            Continue
                        </button>
                    </div>
                    <div className="tw-w-full">
                        <button className="tw-my-2 tw-rounded-xl tw-border tw-w-full tw-px-2 tw-border-blue_400 hover:tw-bg-orange_200 hover:tw-text-white hover:tw-border-orange_200" onClick={handleBack}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )

    if(showOtherSignup) return (
        <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
            <div className="tw-max-w-md">
                <h1 className="tw-font-bold tw-text-center tw-mb-6 tw-mt-8">
                    Please sign up using email, Google, or Facebook to continue.
                </h1>
                <form className="tw-flex tw-flex-col tw-items-center" onSubmit={handleOtherSubmit}>
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
                        <label className="tw-font-bold tw-text-xs">Name</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-ml-2"
                            id="name"
                            type="text"
                            placeholder="Helena Bonham Carter"
                            onChange={handleOtherChange}
                        >
                        </input>
                    </div>
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
                        <label className="tw-font-bold tw-text-xs">Email</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-ml-2"
                            id="email"
                            type="text"
                            placeholder="hcarter@university.edu"
                            onChange={handleOtherChange}
                        >
                        </input>
                    </div>
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-4">
                        <label className="tw-font-bold tw-text-xs">Password</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-ml-2"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleOtherChange}
                        >
                        </input>
                    </div>
                    {validationDetails.length > 0 && (
                        <div>
                            <ul style={{ color: "red" }}>
                                {validationDetails.map((detail, index) => (
                                    <li key={index}>{detail.message}</li>
                                ))}
                            </ul>
                        </div>)
                    }
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-4">
                        <label className="tw-font-bold tw-text-xs">Confirm Password</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-ml-2"
                            id="confirm_password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleOtherChange}
                        >
                        </input>
                    </div>
                    {otherFormData.password.length > 0 && !passwordsMatch && (<p style={{ color: "red" }}>Passwords do not match.</p>)}
                    <div className=" tw-flex tw-flex-col tw-mb-1">
                        <button
                            className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-full tw-my-2 tw-px-11 tw-ml-2"
                            type="submit"
                            >
                            Continue
                        </button>
                    </div>
                </form>
                <div className="tw-flex tw-items-center tw-mb-4 tw-my-2">
                    <hr className="tw-flex-grow tw-border-t tw-border-neutral_300"/>
                    <span className="tw-mx-4 tw-text-sm">or</span>
                    <hr className="tw-flex-grow tw-border-t tw-border-neutral_300"/>
                </div>
                <div className="tw-flex tw-flex-col">
                    <button className="tw-mb-2 tw-border tw-border-neutral_300 tw-rounded-lg tw-w-full">google sign up here</button>
                    <button className="tw-mb-2 tw-border tw-border-neutral_300 tw-rounded-lg">facebook sign up here</button>
                </div>
                <div className="tw-w-full">
                        <button className="tw-my-2 tw-rounded-xl tw-border tw-w-full tw-px-2 tw-border-blue_400 hover:tw-bg-orange_200 hover:tw-text-white hover:tw-border-orange_200" onClick={handleBack}>Back</button>
                </div>
            </div>
        </div>
    )

    if(signUpSuccess) return (
        <div>
            <h1 className="tw-font-bold tw-text-center tw-mb-6 tw-mt-8">
                Thank you for signing up!
            </h1>
            <button className="tw-rounded-xl tw-bg-white hover:tw-bg-orange_200 hover:tw-text-white hover:tw-border-orange_200 tw-border-2 tw-border-blue_400 tw-w-full tw-lg:w-auto">
                Go to profile
            </button>
            <button className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-full tw-lg:w-auto tw-my-2">
                Go to dumbsplain
            </button>
            { confetti ? <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={confettiamount}
                colors={['#8CA8FF', '#4C7BFE', '#F59E6C', '#32BCA3']}
                onConfettiComplete={handleConfetticomplete}
                gravity={0.2}
                /> : null }
        </div>
    )
}

// WORK ON NEXT
// password validation
    // the messages aren't rendering properly (default and custom are rendering)
// field for confirm password
// states 201 validation
// use functions from functions folder
// facebook and google sign in

// BUGS AND SMALL THINGS
// fix input fields being in the center
// might want to fix the tw-ml-2 for the input field
