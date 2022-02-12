import React from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function SignupFailurePopup(props) {

    return (
        <PopupWithForm title="Registration failed!" isPopupWithForm={false} isOpen={props.isOpen} onClose={props.onClose} altText='Try again' onAltClick={props.onAltClick} isBlack={false}>
        </PopupWithForm>
    )
}

export default SignupFailurePopup;