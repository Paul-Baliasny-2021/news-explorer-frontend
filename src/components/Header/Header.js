import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import icon from '../../images/logout-white.svg';

function Header(props) {

    function handleKeywordChange(e) {
        props.setKeyword(e.target.value);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        props.onKeywordSubmit(props.keyword)
    }

    return (
        <header className="header">
            <nav className="header__nav-bar">
                <h2 className="header__nav-title">NewsExplorer</h2>
                <ul className="header__nav-items">
                    <button className='header__burger-menu' onClick={props.onBurgerClick}></button>
                    <p className="header__nav-item header__nav-item_active">Home</p>
                    <Link to="/saved-news" className={props.isSignedIn ? 'header__nav-item' : 'header__nav-item_hidden'} rel="noreferrer noopener">Saved articles</Link>
                    <Link to="/" className={props.isSignedIn ? "header__log-button_signed" : "header__log-button"} onClick={props.isSignedIn ? props.onLogout : props.onLogin}>
                        {props.isSignedIn ? 'Elise' : 'Sign in'}
                        <img src={icon} alt='logout icon' className={props.isSignedIn ? 'header__logout-icon' : 'header__logout-icon_hidden'} />
                    </Link>
                </ul>
            </nav>
            <nav className={props.isMobileNavbarOpen ? 'header__mobile-navbar mobile-navbar' : 'header__mobile-navbar_inactive'}>
                <h2 className="header__mobile-navbar-title">NewsExplorer</h2>
                <button type="button" className="header__mobile-navbar-closer" onClick={props.onClose}>+</button>
                <p className="header__mobile-navbar-item" onClick={props.onClose}>Home</p>
                <Link to="/saved-news" className={props.isSignedIn ? 'header__mobile-navbar-item' : 'header__nav-item_hidden'} rel="noreferrer noopener" onClick={props.onClose}>Saved articles</Link>
                <Link to="/" className={props.isSignedIn ? "header__mobile-log-button_signed" : "header__mobile-log-button"} onClick={props.isSignedIn ? props.onLogout : props.onLogin}>
                    {props.isSignedIn ? 'Elise' : 'Sign in'}
                    <img src={icon} alt='logout icon' className={props.isSignedIn ? 'header__mobile-logout-icon' : 'header__logout-icon_hidden'} />
                </Link>
            </nav>
            <section className="header__search">
                <h1 className="header__search-title">What's going on in the world?</h1>
                <p className="header__search-subtitle">Find the latest news on any topic and save them in your personal account.</p>
                <form className="header__search-form" onSubmit={handleSearchSubmit}>
                    <input className="header__search-input" placeholder="Enter topic" type='text' name='keyword' required value={props.keyword || ''} onChange={handleKeywordChange}/>
                    <button type="submit" className="header__search-button">Search</button>
                </form>
            </section>
        </header>
    )
}

export default Header;