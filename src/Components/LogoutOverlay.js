import React, { useState, useContext } from 'react'
import ReactGA4 from 'react-ga4';
import { useNavigate } from 'react-router-dom';
import userLogOut from '../Functions/userLogOut';
import UserContext from '../userContext';
import '../CSS/Overlay.css'
import '../CSS/LeaderBoardLayOut.css'
import OverlayCurve from '../SVGasComponents/overlayCurve';


export default function LogoutOverlay({ showLogoutOverlay, setShowLogoutOverlay, theme }) {

    const { user, setUser } = useContext(UserContext);
    const [cardscale, setCardscale] = useState(1);
    const navigate = useNavigate();

    const closeOverlay = (e) => {
        e.preventDefault();
        ReactGA4.event({
            action: 'Logout Overlay Click Close',
            category: 'Logout Overlay',
            label: 'Click Logout Close',
            // value: new Date().getTime() - startTime,
            });
        setShowLogoutOverlay(false);
    }

    const handleLogoutClick = (e) => {
        userLogOut()
        setUser(null)
        // console.log(user)
        setShowLogoutOverlay(false);
        // on logout, reload the page to clear the user context
        window.location.reload();
    }

    return (
        <div className={showLogoutOverlay ? "modal-overlay" : "modal-overlay-off" }>
            <div className='modal-content' data-theme={theme}
            style={{
                overflow: 'hidden',
                scale: `${cardscale}`,
            }}
            >
                <OverlayCurve theme={theme}
                viewBox={'0 0 100% 100%'}
                styles={{
                    padding: '0',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    width: '100%',
                    scale: '1.07',
                }}
                />
                <div className='infocontainer'>
                    <div className='headercontainer'>
                        <h1 className="heading-logout"
                        >Are you sure you want to logout?</h1>
                        <span className='closeOverlay' onClick={closeOverlay}>&times;</span>
                    </div>
                    <ol
                    style={{
                        height: 'auto',
                        overflow: 'visible',
                    }}
                    >
                    </ol>
                </div>
                <div>
                    <button onClick={handleLogoutClick} className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-full tw-lg:w-auto tw-my-2">Yes, logout</button>
                    <button className="tw-rounded-xl tw-bg-white hover:tw-bg-orange_200 hover:tw-text-white hover:tw-border-orange_200 tw-border tw-border-blue_400 tw-w-full tw-lg:w-auto">Go to profile</button>
                </div>
            </div>
        </div>
    )
}