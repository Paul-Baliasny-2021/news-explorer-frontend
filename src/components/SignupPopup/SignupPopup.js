import React, { useState, useEffect } from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import * as auth from '../../utils/auth';

function SignupPopup(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false)

    const resetRegistrationForm = () => {
        setEmail('');
        setPassword('');
        setUsername('');
        setEmailErrorMessage('');
        setPasswordErrorMessage('');
        setUsernameErrorMessage('');
        setIsFormValid(false)
    };

    useEffect(() => {
        resetRegistrationForm();
    }, [props.isOpen]);

    function validateEmail(value) {
        if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            setEmailErrorMessage('Invalid email address');
            setIsEmailValid(false);
            // console.log(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
        } else {
            // console.log(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
            setIsEmailValid(true);
            setEmailErrorMessage('');
        }
    }

    function validatePassword(value) {
        if (!value || value.length < 6) {
            setPasswordErrorMessage('Password should have at least 6 characters');
            setIsPasswordValid(false);
            // console.log(value.length < 6)
        } else {
            // console.log('password is ok')
            setIsPasswordValid(true);
            setPasswordErrorMessage('');
        }
    };

    function validateUsername(value) {
        if (!value || value.length < 2) {
            setUsernameErrorMessage('Username should have at least 2 characters');
            setIsUsernameValid(false);
            // console.log(value.length <= 2)
        } else {
            // console.log('username is ok')
            setIsUsernameValid(true);
            setUsernameErrorMessage('');
        }
    }

    function validateForm() {
        setIsFormValid(false);
        console.log(isEmailValid, isPasswordValid, isUsernameValid)
        if (isEmailValid && isPasswordValid && isUsernameValid) {
            setIsFormValid(true)
            // console.log('all inputs are valid')
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
            console.log(email, password, username)
            e.preventDefault();
            auth.register(email, password, username)
                .then((res) => {
                    if (!res || res.statusCode === 409) {
                        console.log('Something went wrong, try again')
                        throw new Error('Something went wrong, try again')
                    }
                })
                .then(() => {
                    props.onSignUp();
                    resetRegistrationForm();
                })
                .catch((err) => {
                    props.handleError();
                    resetRegistrationForm();
                });
        }
    };

    return (
        <PopupWithForm title="Sign up" submitButtonText="Sign up" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} altText='Sign in' onAltClick={props.onAltClick} isFormValid={isFormValid} isPopupWithForm={true} isBlack={true} >
            <label htmlFor="email" className="popup__input-label">Email</label>
            <input
                // id="email"
                className="popup__input"
                type="email"
                name="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={e => {
                    validateEmail(e.target.value);
                    setEmail(e.target.value);
                    validateForm();
                }
                }
            />
            <span id="email-error" className="popup__error-message">{emailErrorMessage}</span>
            <label htmlFor="password" className="popup__input-label">Password</label>
            <input
                id="password"
                className="popup__input"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
                value={password}
                onChange={e => {
                    validatePassword(e.target.value);
                    setPassword(e.target.value);
                    validateForm();
                }
                }
            />
            <span id="password-error" className="popup__error-message">{passwordErrorMessage}</span>
            <label htmlFor="username" className="popup__input-label">Username</label>
            <input
                id="username"
                className="popup__input"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                minLength={2}
                value={username}
                onChange={e => {
                    validateUsername(e.target.value);
                    setUsername(e.target.value);
                    validateForm();
                }}
            />
            <span id="username-error" className="popup__error-message">{usernameErrorMessage}</span>
        </PopupWithForm>
    )
}

export default SignupPopup;