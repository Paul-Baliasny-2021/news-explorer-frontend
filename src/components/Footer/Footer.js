import fb from '../../images/fb.svg';
import gh from '../../images/github.svg';
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <p className="footer__copyright">&copy; 2022 NewsExplorer, Powered by News API</p>
            <div className="footer__navbar">
                <div className='footer__navbar-item_words'>
                    <a href="/" className="footer__navbar-item" rel="noreferrer noopener">Home</a>
                    <a className="footer__navbar-item" href='https://practicum.yandex.com/' target='_blank' rel="noreferrer noopener">Practicum by Yandex</a>
                </div>
                <div className='footer__navbar-item_symbols'>
                    <a href='https://github.com/Paul-Baliasny-2021' target='_blank' rel="noreferrer noopener"><img className="footer__navbar-social" src={gh} alt='Github logo' /></a>
                    <a href='https://www.facebook.com/' target='_blank' rel="noreferrer noopener"><img className="footer__navbar-social" src={fb} alt='Facebook logo' /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;