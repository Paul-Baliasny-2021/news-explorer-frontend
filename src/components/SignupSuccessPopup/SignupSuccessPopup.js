import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function SignupSuccessPopup(props) {

    return (
        <PopupWithForm title="Registration successfully completed!" isPopupWithForm={false} isOpen={props.isOpen} onClose={props.onClose} altText='Sign in' onAltClick={props.onAltClick} >
        </PopupWithForm>
    )
}

export default SignupSuccessPopup;