import './NotFoundPage.css';
import notFoundIcon from '../../images/not-found.svg';

function NotFoundPage() {
    return (
        <div className="not-found-page">
            <img className="not-found-page__icon" src={notFoundIcon} alt='Nothing found' />
            <h3 className='notfound-page__title'>Nothing found</h3>
            <p className='not-found-page__text'>Sorry, but nothing matched your search terms.</p>
        </div>
    )
}

export default NotFoundPage;