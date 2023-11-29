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
        <div>
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
        </div>
    )
}

// fix input fields being in the center
// button click colors
// might want to fix the tw-ml-2 for the input field