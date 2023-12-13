import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import signUp from '../Functions/signUp';
// import checkUserName from '../Functions/checkUsername';
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
        setShowLanding(false)
        setShowEdu(true)
    }

    const handleNoClick = () => {
        setShowLanding(false)
        setShowOtherSignup(true)
    }

    const handleBack = () => {
        setShowLanding(true)
        setShowEdu(false)
        setShowOtherSignup(false)
    }

    // password validation
    const passwordValidator = require('password-validator')

    // creating password schema
    const schema = new passwordValidator()
    schema
    .not().min(8, 'Password must have at least 8 characters.')
    .not().max(100, 'Password cannot exceed 100 characters.')
    .has().uppercase(1, 'Password must contain at least one uppercase letter.')
    .has().lowercase(1, 'Password must contain at least one lowercase letter.')
    .has().digits(2, 'Password must contain at least two digits.')
    .has().not().spaces(1, 'Password cannot contain spaces.')
    .oneOf(['Passw0rd', 'Passw00rd', 'Passw0rd1', 'Password12', 'Password123'], 'Password cannot be common or easy to guess.')

    const validatePasswordWithDetails = (password) => {
        return schema.validate(password, { list: true, details: true })
    }

    // state for passwords matching & validated
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [validationDetails, setValidationDetails] = useState([]);

    // state for .edu sign up form
    const initialEduState = {
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    const [eduFormData, setEduFormData] = useState(initialEduState);

    // state to track whether the field is touched or focused
    const [emailTouched, setEmailTouched] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);

    // state for valid email
    const [validEmail, setValidEmail] = useState(null)

    // state for valid edu email
    const [validEduEmail, setValidEduEmail] = useState(null)

    // helper function to check if email is valid
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // helper function to check if email is .edu
    const validateEduEmail = (email) => {
        const emailDomain = email.split('@')[1]
        return !!emailDomain && emailDomain.includes('.edu')
    }

    // state for Signup error
    const [signupError, setSignupError] = useState(false)

    // helper functions for .edu input
    const handleEduChange = (e) => {
        setEduFormData({...eduFormData, [e.target.id]: e.target.value})

        // if (e.target.value === 'username')

        if (e.target.id === 'email') {

            const email = e.target.value
            setEmailTouched(true)
            setEmailFocused(e.target.value !== '')
            if (!email.trim() || !validateEmail(email)) {
                setValidEmail(false)
            } else if (!validateEduEmail(email)) {
                setValidEmail(true)
                setValidEduEmail(false)
            } else {
                setValidEmail(true)
                setValidEduEmail(true)
            }

        } else if (e.target.id === 'password') {
            setPasswordValid(schema.validate(e.target.value))
            const details = validatePasswordWithDetails(e.target.value)
            setValidationDetails(details)
            setPasswordsMatch(e.target.value === eduFormData.confirm_password)
        } else if (e.target.id === 'confirm_password') {
            setPasswordsMatch(e.target.value === eduFormData.password)
        }
    }

    // .edu handle submit
    const handleEduSubmit = (e) => {
        e.preventDefault()

        const passwordValid = schema.validate(eduFormData.password);
        if (validEmail && validEduEmail && passwordValid && passwordsMatch) {
            signUp(eduFormData.username,eduFormData.email,eduFormData.password)
            setShowEdu(false)
            setShowOtherSignup(false)
            setSignUpSuccess(true)
            setConfetti(true)
        } else {
            setSignupError(true)
        }
    }

    // state for other signup form
    const initialOtherState = {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    }
    const [otherFormData, setOtherFormData] = useState(initialOtherState);

    // helper function for other input
    const handleOtherChange = (e) => {
        setOtherFormData({...otherFormData, [e.target.id]: e.target.value})

        if (e.target.id === 'email') {

            const email = e.target.value
            setEmailTouched(true)
            setEmailFocused(e.target.value !== '')
            if (!email.trim() || !validateEmail(email)) {
                setValidEmail(false)
            } else {
                setValidEmail(true)
            }

        } else if (e.target.id === 'password') {
            setPasswordValid(schema.validate(e.target.value))
            const details = validatePasswordWithDetails(e.target.value)
            setValidationDetails(details)
            setPasswordsMatch(e.target.value === otherFormData.confirm_password);
        }
        else if (e.target.id === 'confirm_password') {
            setPasswordsMatch(e.target.value === otherFormData.password)
        }
    }

    // other signup form handle submit
    const handleOtherSubmit = (e) => {
        e.preventDefault()
        const passwordValid = schema.validate(otherFormData.password);
        if (validEmail && passwordValid && passwordsMatch) {
            setShowOtherSignup(false)
            setSignUpSuccess(true)
            setConfetti(true)
        } else {
            setSignupError(true)
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
        <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
        {/* was tw-p-20 */}
            <div className="tw-w-full tw-max-w-md">
                <h1 className="tw-font-bold tw-text-center tw-mb-6 tw-mt-8">
                    Please sign up with your .edu email address.
                </h1>
                <form onSubmit={handleEduSubmit} className="tw-flex tw-flex-col tw-items-center">
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
                        <label className="tw-font-bold tw-text-xs">Username</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-mt-1"
                            id="username"
                            type="text"
                            placeholder="hbcarter"
                            onChange={handleEduChange}
                            required
                        />
                    </div>
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
                        <label className="tw-font-bold tw-text-xs">Email</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-mt-1"
                            id="email"
                            type="text"
                            placeholder="hbcarter@university.edu"
                            onChange={handleEduChange}
                            required
                        />
                    <div>
                    {emailTouched && !validEmail && (<p style={{ color: "red" }}>Please enter a valid email.</p>)}
                    {validEmail && emailTouched && !validEduEmail && (<p style={{ color: "red" }}>Please enter a .edu email.</p>)}
                    </div>
                    </div>
                    {/* <div className="tw-my-2 tw-w-full"> */}
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
                        <label className="tw-font-bold tw-text-xs">Password</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-mt-1"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleEduChange}
                            required
                        />
                    </div>
                    {validationDetails.length > 0 && (
                        <div className="tw-text-sm tw-text-gray-600">
                            <ul>
                                {validationDetails.map((detail, index) => (
                                    <li key={index}>{detail.message}</li>
                                ))}
                            </ul>
                        </div>)
                    }
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
                        <label className="tw-font-bold tw-text-xs">Confirm Password</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-mt-1"
                            id="confirm_password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleEduChange}
                            required
                        />
                    </div>
                    {eduFormData.password.length > 0 && !passwordsMatch && (<p style={{ color: "red" }}>Passwords do not match.</p>)}
                    <div className="tw-flex tw-flex-col tw-mb-1">
                        <button className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-full tw-my-2" type="submit">
                            Continue
                        </button>
                    </div>
                    {signupError && (<p style={{ color: "red" }}>There was an error with your signup.</p>)}
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
                        <label className="tw-font-bold tw-text-xs">Username</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-ml-2"
                            id="username"
                            type="text"
                            placeholder="hbcarter"
                            onChange={handleOtherChange}
                            required
                        >
                        </input>
                    </div>
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
                        <label className="tw-font-bold tw-text-xs">Email</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-ml-2"
                            id="email"
                            type="text"
                            placeholder="hbcarter@university.edu"
                            onChange={handleOtherChange}
                            required
                        >
                        </input>
                    {emailTouched && !validEmail && (<p style={{ color: "red" }}>Please enter a valid email.</p>)}
                    </div>
                    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-4">
                        <label className="tw-font-bold tw-text-xs">Password</label>
                        <input
                            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-ml-2"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            onChange={handleOtherChange}
                            required
                        >
                        </input>
                    </div>
                    {validationDetails.length > 0 && (
                        <div className="tw-text-sm tw-text-gray-600">
                            <ul>
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
                            required
                        >
                        </input>
                    </div>
                    {otherFormData.password.length > 0 && !passwordsMatch && (<p style={{ color: "red" }}>Passwords do not match.</p>)}
                    <div className="tw-flex tw-flex-col tw-mb-1">
                        <button
                            className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-full tw-my-2 tw-px-11 tw-ml-2"
                            type="submit"
                            >
                            Continue
                        </button>
                    </div>
                    {signupError && (<p style={{ color: "red" }}>There was an error with your signup.</p>)}
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
// use functions from functions folder for sign up
// states 201 validation
// facebook and google sign in (O-Auth); skip for right now
// username validation - the blacklisted usernames
    // use function "check username" and make it a boolean to move or or not

// BUGS AND SMALL THINGS
// fix input fields being in the center
// might want to fix the tw-ml-2 for the input field
// make the errors look better
// dumbsplain header?
