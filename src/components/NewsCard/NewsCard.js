import './NewsCard.css';
import React, { useState } from 'react';

function NewsCard(props) {

    const [isSaving, setIsSaving] = useState(false)
    const isSavedArticle = props.savedArticles.map(data => data.title).some(item => item === props.cardData.title)

    function handleBookmarkHandle() {
        setIsSaving(true)
        props.onBookmarkClick(props.cardData)
    };

    function onUnauthorizedClick() {
        props.openSigninModal()
    }

    return (
        <article className="card">
            <div className='card__image-container'>
                <img src={props.imageLink} alt="News item" className='card__image' />
                <div className={isSaving ? "card__save-area" : "card__save-area_hidden"}>
                    <span className="card__loader-circle"></span>
                    <p className='card__loader-text'>The article is being processed...</p>
                </div>
            </div>
            <div className={isSavedArticle ? 'card__bookmark_saved' : 'card__bookmark'} onClick={props.isSignedIn ? handleBookmarkHandle : onUnauthorizedClick}><span className={props.isSignedIn ? 'card__tooltip_hidden' : 'card__tooltip'}></span></div>
            <div className='card__text'>
                <p className='card__date'>{props.date}</p>
                <h2 className='card__title'>{props.title}</h2>
                <p className='card__synopsis'>{props.text}</p>
                <a className='card__link' href={props.articleLink} target='_blank' rel="noreferrer noopener"><p className='card__source'>{props.source}</p></a>
            </div>
        </article>
    )
}

export default NewsCard;