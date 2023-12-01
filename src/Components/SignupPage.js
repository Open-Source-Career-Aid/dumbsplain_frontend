import React from 'react'
import "../CSS/SignupPage.css"

export default function SignupPage() {
    return (
        <div >
            <h1 className="tw-font-bold tw-text-center">
                Do you have an .edu address?
            </h1>
            <button className="btn-primary">
                Yes
            </button>
            <button className="tw-rounded-xl tw-bg-white tw-border-black">
                No
            </button>
        </div>
    )
}

// fix buttons
// border, hover colors, click colors, spacing, padding