import * as React from 'react'
import crossIcon from '../../images/close.svg';
import './PopupWithForm.css';

function PopupWithForm(props) {
    return (
        <div className={props.isOpen ? 'popup_active popup' : `popup`}>
            <div className="popup__window">
                <h2 className="popup__title">{props.title}</h2>
                <button type="button" className="popup__closer" onClick={props.onClose}><img src={crossIcon} alt="Closing cross" className="popup__x" /></button>
                <form className={props.isPopupWithForm ? 'popup__form' : 'popup__form_disabled'} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className={props.isFormValid ? "popup__submit" : "popup__submit_disabled"}>{props.submitButtonText}</button>
                </form>
                <button type='button' className={props.isPopupWithForm ? 'popup__open-another' : 'popup__open-another_success'} onClick={props.onAltClick}><span className={props.isPopupWithForm ? 'popup__or' : 'popup__or_success'}>or </span>{props.altText}</button>
            </div>
        </div>
    )
}

export default PopupWithForm;