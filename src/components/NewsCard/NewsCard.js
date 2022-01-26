import './NewsCard.css';

function NewsCard(props) {
   
    function handleBookmarkHandle() {
        props.onBookmarkClick(props.cardData);
    };

    return (
        <div className="card">
            <div className='card__image-container'><img src={props.imageLink} alt="News item" className='card__image' /></div>
            <div className={props.isSavedArticle ? 'card__bookmark_saved' : 'card__bookmark'} onClick={props.isSignedIn ? handleBookmarkHandle : undefined }><span className={props.isSignedIn ? 'card__tooltip_hidden' : 'card__tooltip'}></span></div>
            <div className='card__text'>
                <p className='card__date'>{props.date}</p>
                <h2 className='card__title'>{props.title}</h2>
                <p className='card__synopsis'>{props.text}</p>
                <p className='card__source'>{props.source}</p>
            </div>
        </div>
    )
}

export default NewsCard;