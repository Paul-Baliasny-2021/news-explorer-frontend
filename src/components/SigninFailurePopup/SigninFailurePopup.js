import React from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function SigninFailurePopup(props) {

    return (
        <PopupWithForm title="Authorization failed!" isPopupWithForm={false} isOpen={props.isOpen} onClose={props.onClose} altText='Try again' onAltClick={props.onAltClick} isBlack={false}>
        </PopupWithForm>
    )
}

export default SigninFailurePopup;