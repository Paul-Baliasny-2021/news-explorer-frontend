import './SavedNewsHeader.css';
import '../Header/Header.css'
import logout from '../../images/logout.svg';
import { Link } from 'react-router-dom';
import savedArticles from '../../utils/constants';

function SavedNewsHeader(props) {
    return (
        <header className="saved-header">
            <nav className="saved-header__nav-bar">
                <h2 className="saved-header__nav-title">NewsExplorer</h2>
                <ul className="saved-header__nav-items">
                <button className='saved-header__burger-menu' onClick={props.onBurgerClick}></button>
                    <Link to="/" className="saved-header__nav-item" rel="noreferrer noopener">Home</Link>
                    <p className="saved-header__nav-item saved-header__nav-item_active">Saved articles</p>
                    <Link to="/" className="saved-header__log-button" onClick={props.onLogClick} rel="noreferrer noopener">Elise <img src={logout} alt='logout icon' className='saved-header__logout-icon'/></Link>
                </ul>
            </nav>
            <nav className={props.isMobileNavbarOpen ? 'saved-header__mobile-navbar mobile-navbar' : 'header__mobile-navbar_inactive'}>
                <h2 className="saved-header__mobile-navbar-title">NewsExplorer</h2>
                <button type="button" className="saved-header__mobile-navbar-closer" onClick={props.onClose}>+</button>
                <ul className="saved-header__mobile-nav-items">
                    <Link to="/" className="saved-header__mobile-navbar-item" rel="noreferrer noopener" onClick={props.onClose}>Home</Link>
                    <p className="saved-header__mobile-navbar-item" onClick={props.onClose}>Saved articles</p>
                    <Link to="/" className="saved-header__mobile-log-button" onClick={props.onLogClick} rel="noreferrer noopener">Elise <img src={logout} alt='logout icon' className='saved-header__mobile-logout-icon'/></Link>
                </ul>
            </nav>
            <section className="saved-header__info">
                <h1 className="saved-header__info-title">Saved articles</h1>
                <p className="saved-header__info-subtitle">Elise, you have {savedArticles.length} saved articles</p>
                <p className="saved-header__info-keywords">By keywords: <span className='saved-header__info-categories'>{props.category}</span></p>
            </section>
        </header>
    )
}

export default SavedNewsHeader;