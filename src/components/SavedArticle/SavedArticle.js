import './SavedArticle.css';
import '../NewsCard/NewsCard.css';

function SavedArticle(props) {

    function deleteArticle() {
        props.onDeleteClick(props.cardData)
    };

    return (
        <div className="card saved-card">
            <div className='card__image-container'><img src={props.imageLink} alt="News item" className='card__image' /></div>
            <div className='saved-card__delete-icon' onClick={deleteArticle}><span className='saved-card__delete-tooltip'></span></div>
            <div className='saved-card__category'>{props.category}</div>
            <div className='card__text'>
                <p className='card__date'>{props.date}</p>
                <h2 className='card__title'>{props.title}</h2>
                <p className='card__synopsis'>{props.text}</p>
                <a className='card__link' href={props.articleLink} target='_blank' rel="noreferrer noopener"><p className='card__source'>{props.source}</p></a>
            </div>
        </div>
    )
}

export default SavedArticle;