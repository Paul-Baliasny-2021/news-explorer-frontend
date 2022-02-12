import fb from '../../images/fb.svg';
import gh from '../../images/github.svg';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2022 Paul Baliasny, powered by News API</p>
            <nav className="footer__navbar">
                <div className='footer__navbar-item_words'>
                    <a href="/" className="footer__navbar-item" rel="noreferrer noopener">Home</a>
                    <a className="footer__navbar-item" href='https://practicum.yandex.com/' target='_blank' rel="noreferrer noopener">Practicum by Yandex</a>
                </div>
                <div className='footer__navbar-item_symbols'>
                    <a href='https://github.com/Paul-Baliasny-2021' target='_blank' rel="noreferrer noopener"><img className="footer__navbar-social" src={gh} alt='Github logo' /></a>
                    <a href='https://www.facebook.com/' target='_blank' rel="noreferrer noopener"><img className="footer__navbar-social" src={fb} alt='Facebook logo' /></a>
                </div>
            </nav>
        </footer>
    )
}

export default Footer;