import { ReactComponent as OverlayCurveSVG } from "./infoheader.svg";

export default function OverlayCurve({ viewBox , styles }) {

    return (
        <>
            <svg 
            viewBox={viewBox}
                style={styles}
                preserveAspectRatio="xMidYMid meet"
                className='headercurve'
            >
                <OverlayCurveSVG
                 />
                <svg width="411" height="150" viewBox="0 0 411 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M-1 102.462L16.1667 99.6154C33.3333 96.7693 67.6667 91.077 102 99.6154C136.333 108.154 170.667 130.923 205 142.308C239.333 153.692 273.667 153.692 308 133.769C342.333 113.846 376.667 74 393.833 54.0769L411 34.1539V0H393.833C376.667 0 342.333 0 308 0C273.667 0 239.333 0 205 0C170.667 0 136.333 0 102 0C67.6667 0 33.3333 0 16.1667 0H-1V102.462Z" fill="#4C7BFE"/>
                </svg>
            </svg>
        </>
    )
}