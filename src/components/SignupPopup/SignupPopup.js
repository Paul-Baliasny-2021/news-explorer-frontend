import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function SignupPopup(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const resetRegistrationForm = () => {
        setEmail('');
        setPassword('');
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onSignUp();
        resetRegistrationForm();
        console.log(username);
    };

    return (
        <PopupWithForm title="Sign up" submitButtonText="Sign up" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} altText='Sign in' onAltClick={props.onAltClick} isFormValid={true} isPopupWithForm={true} >
            <label htmlFor="email" className="popup__input-label">Email</label>
            <input id="email" className="popup__input" type="email" name="email" placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} />
            <span id="email-error" className="popup__error-message">Invalid email address</span>
            <label htmlFor="password" className="popup__input-label">Password</label>
            <input id="password" className="popup__input" type="password" name="password" placeholder="Enter password" required value={password} onChange={e => setPassword(e.target.value)} />
            <span id="profession-input-error" className="popup__error-message">Password should have at least 6 characters</span>
            <label htmlFor="username" className="popup__input-label">Username</label>
            <input id="username" className="popup__input" type="text" name="username" placeholder="Enter your username" required value={username} onChange={e => setUsername(e.target.value)} />
            <span id="profession-input-error" className="popup__error-message">This username is not available</span>
        </PopupWithForm>
    )
}

export default SignupPopup;