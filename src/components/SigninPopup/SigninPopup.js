import React, { useState, useEffect } from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import * as auth from '../../utils/auth';

function SigninPopup(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false)

    const resetSigninForm = () => {
        setEmail('');
        setPassword('');
        setEmailErrorMessage('');
        setPasswordErrorMessage('');
        setIsFormValid(false);
        setIsPasswordValid(false);
        setIsEmailValid(false);
        console.log(isEmailValid, isPasswordValid)
    };

    useEffect(() => {
        resetSigninForm();
    }, [props.isOpen]);

    function validateEmail(value) {
        if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            setEmailErrorMessage('Invalid email address');
            setIsEmailValid(false);
        } else {
            setIsEmailValid(true);
            setEmailErrorMessage('');
        }
    }

    function validatePassword(value) {
        if (!value || (value.length + 1) < 6) {
            console.log(value.length)
            setPasswordErrorMessage('Password should have at least 6 characters');
            setIsPasswordValid(false);
        } else {
            setIsPasswordValid(true);
            setPasswordErrorMessage('');
        }
    };

    function validateForm() {
        setIsFormValid(false);
        // console.log(isEmailValid, isPasswordValid)
        if (isEmailValid && isPasswordValid) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
            // console.log('some input is invalid')
        } 
    }

    function handleSubmit(e) {
        if (!isFormValid) {
            e.preventDefault();
            props.handleError();
        } else {
            e.preventDefault();
            auth.authorize(email, password)
                .then((res) => {
                    if (!res || res.statusCode === 401) {
                        console.log('Authorization failed')
                        throw new Error('Authorization failed')
                    }
                    if (res && res.token) {
                        localStorage.setItem('token', res.token);
                        props.onSubmit();
                        props.checkToken();
                        resetSigninForm();
                    }
                })
                // .then(window.location.reload())
                .catch((err) => {
                    props.handleError();
                    console.log(err)
                });
        }
    };

    return (
        <PopupWithForm title="Sign in" submitButtonText="Sign in" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} altText='Sign up' onAltClick={props.onAltClick} isFormValid={isFormValid} isPopupWithForm={true} isBlack={true}>
            <label htmlFor="auth-email" className="popup__input-label">Email</label>
            <input
                id="auth-email"
                className="popup__input"
                type="email"
                name="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                    validateForm();
                }
                }
            />
            <span id="auth-email-error" className="popup__error-message">{emailErrorMessage}</span>
            <label htmlFor="auth-password" className="popup__input-label">Password</label>
            <input
                id="auth-password"
                className="popup__input"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                value={password}
                onChange={e => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                    validateForm();
                }
                }
            />
            <span id="auth-password-error" className="popup__error-message">{passwordErrorMessage}</span>
        </PopupWithForm>
    )
}

export default SigninPopup;