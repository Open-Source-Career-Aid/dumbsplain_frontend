import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import userLogOut from '../Functions/userLogOut';
import UserContext from '../userContext';

export default function LogoutOverlay({ showLoginOverlay, setShowLoginOverlay }) {
    const { user, setUser } = useContext(UserContext);

    return (
        <>
        </>
    )
}