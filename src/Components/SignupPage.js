import React, {useState} from 'react'
import "../CSS/SignupPage.css"

export default function SignupPage() {

    const [showLanding, setShowLanding] = useState(true)
    const [showEdu, setShowEdu] = useState(false)
    const [showOtherSignup, setShowOtherSignup] = useState(false)
    // state to show .edu?
    // state to show .edu login
    const [signUpSuccess, setSignUpSuccess] = useState(false)
    // state to show congratulations

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

    // state for .edu sign up form
    const initialEduState = {
            name: '',
            email: '',
            password: ''
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
        } else {
            console.log('invalid .edu email')
            setValidEmail(false)
        }
    }

    // state for other signup form
    const initialOtherState = {
        name: '',
        email: '',
        password: ''
    }
    const [otherFormData, setOtherFormData] = useState(initialOtherState);

    // helper function for other input
    const handleOtherChange = (e) => {
        setOtherFormData({...otherFormData, [e.target.id]: e.target.value})
    }

    // other signup form handle submit
    const handleOtherSubmit = (e) => {
        e.preventDefault()
        console.log(otherFormData)
        setShowOtherSignup(false)
        setSignUpSuccess(true)
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
        </div>
    )
}

// fix input fields being in the center
// button click colors
// might want to fix the tw-ml-2 for the input field

// old edu form tailwind
{/* <div>
<h1 className="tw-font-bold tw-text-center tw-mb-6 tw-mt-8">
    Please sign up with your .edu email address.
</h1>
<form>
    <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
    <label className="tw-font-bold tw-text-xs">Name</label>
    <input
        className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-1/2 tw-ml-2"
        id="name"
        type="text"
        placeholder="Helena Bonham Carter"
    ></input>
    </div>
    <div className="tw-flex tw-flex-col tw-mb-4">
        <label className="tw-font-bold tw-text-xs">Email</label>
        <input
            className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-1/2 tw-ml-2"
            id="email"
            type="text"
            placeholder="hcarter@university.edu">
        </input>
    </div>
    <div>
        <button className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-1/2 tw-my-2" type="button">
            Continue
        </button>
    </div>
</form>
</div> */}