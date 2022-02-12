import React from "react";
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function SignupSuccessPopup(props) {

    return (
        <PopupWithForm title="Registration successfully completed!" isPopupWithForm={false} isOpen={props.isOpen} onClose={props.onClose} altText='Sign in' onAltClick={props.onAltClick} isBlack={true}>
        </PopupWithForm>
    )
}

export default SignupSuccessPopup;