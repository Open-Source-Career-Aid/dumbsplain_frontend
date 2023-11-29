import React, {useState} from 'react'
import "../CSS/SignupPage.css"

export default function SignupPage() {

    const [showLanding, setShowLanding] = useState(true)
    const [showEdu, setShowEdu] = useState(false)
    // state to show .edu?
    // state to show .edu login
    // state to show you've signed up
    // state to show congratulations
    // state to show sign up with email, FB, google

    const handleYesClick = () => {
        console.log('yes clicked')
        setShowLanding(false)
        setShowEdu(true)
    }

    const handleNoClick = () => {
        console.log('no clicked')
    }

    if(showLanding) return (
        <div>
            <h1 className="tw-font-bold tw-text-center">
                Do you have an .edu address?
            </h1>
            <button onClick={handleYesClick} className="tw-rounded-xl tw-bg-blue tw-text-white tw-border tw-border-white tw-hover:bg-orange tw-w-full tw-lg:w-auto tw-my-2">
                Yes
            </button>
            <button onClick={handleNoClick} className="tw-rounded-xl tw-bg-white tw-border tw-border-blue tw-w-full tw-lg:w-auto">
                No
            </button>
        </div>
    )

    if(showEdu) return (
        <div>
            <h1 className="tw-font-bold tw-text-center">
                Please sign up with your .edu email address.
            </h1>
            <form>
                <div>
                    <label for="Helena Bonham Carter">Name</label>
                    <input></input>
                </div>
                <div>
                    <label>Email</label>
                    <input></input>
                </div>
            </form>
        </div>
    )
}

// fix buttons
// border, hover colors, click colors, spacing, padding