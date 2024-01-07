import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import userLogin from '../Functions/userLogin';
import UserContext from '../userContext';

export default function LoginOverlay({ showLoginOverlay, setShowLoginOverlay }) {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // state for form
    const initialState = {
        username: '',
        password: ''
    }
    const [formData, setFormData] = useState(initialState)

    const close = () => {
        setShowLoginOverlay(false)
    }

    const handleSignupClick = () => {
        navigate('/signup')
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleLogin = () => {
        console.log(formData)
        userLogin(formData.username, formData.password)
        setUser( {username: formData.username })
        setShowLoginOverlay(false)
    }

    return (
        <div>
            <div className="modal fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded shadow-lg">
                    <div>
                        <button onClick={close} className="tw-my-2 tw-rounded-xl tw-border tw-w-12 tw-text-2xs tw-border-blue_400 hover:tw-bg-orange_200 hover:tw-text-white hover:tw-border-orange_200">
                        close
                        </button>
                    </div>
                    <div>
                        <form onSubmit={handleLogin}>
                            <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
                                <label className="tw-font-bold tw-text-xs">Username</label>
                                <input
                                    className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-ml-2"
                                    id="username"
                                    type="text"
                                    placeholder="hbcarter"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="tw-my-2 tw-flex tw-flex-col tw-mb-1">
                                <label className="tw-font-bold tw-text-xs">Password</label>
                                <input
                                    className="tw-rounded-lg tw-border tw-border-neutral_300 tw-py-1 tw-px-1 tw-text-xs tw-w-full tw-ml-2"
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="tw-flex tw-flex-col tw-mb-1">
                                <button className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-full tw-my-2 tw-px-10" type="submit">
                                Login
                                </button>
                            </div>
                        </form>
                        <div className="tw-flex tw-flex-col tw-mb-1">
                            <p className="tw-text-xs">Don't have an account? Click sign up below.</p>
                                <button onClick={handleSignupClick} className="tw-rounded-xl tw-bg-blue_400 hover:tw-bg-orange_200 tw-text-white tw-border tw-border-white tw-w-full tw-my-2 tw-px-10">
                                Signup
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

