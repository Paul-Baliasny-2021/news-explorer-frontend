import React, { useState, useEffect } from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function SigninPopup(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit()
       
    };

    return (
        <PopupWithForm title="Sign in" submitButtonText="Sign in" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} altText='Sign up' onAltClick={props.onAltClick} isFormValid={props.isFormValid} isPopupWithForm={true} >
            <label htmlFor="auth-email" className="popup__input-label">Email</label>
            <input id="auth-email" className="popup__input" type="email" name="email" placeholder="Enter email" required value={email} onChange={e => setEmail(e.target.value)} />
            <span id="auth-email-error" className="popup__error-message">Invalid email address</span>
            <label htmlFor="auth-password" className="popup__input-label">Password</label>
            <input id="auth-password" className="popup__input" type="password" name="password" placeholder="Enter password" required value={password} onChange={e => setPassword(e.target.value)} />
            <span id="auth-password-error" className="popup__error-message">Password should have at least 6 characters</span>
        </PopupWithForm>
    )
}

export default SigninPopup;