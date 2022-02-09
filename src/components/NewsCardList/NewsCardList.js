import React, { useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { convertDateFormat } from '../../utils/constants';

function NewsCardList(props) {
    const [numberOfCards, setNumberOfCards] = useState(3);

    function showMore() {
        setNumberOfCards(numberOfCards + 3);
    }
    
    return (
        <section className="list">
            <h2 className='list__title'>Search results</h2>
            <ul className="list__grid">
                {props.articles.slice(0, numberOfCards).map((data) => 
                    <NewsCard
                        isSignedIn={props.isSignedIn}
                        onBookmarkClick={props.onBookmarkClick}
                        openSigninModal={props.openSigninModal}
                        savedArticles={props.savedArticles}
                        isSaving={props.isSaving}
                        cardData={data}
                        key={(Math.random() * (Math.random()))}
                        imageLink={data.urlToImage}
                        date={convertDateFormat(new Date(data.publishedAt))}
                        title={data.title}
                        text={data.content}
                        source={data.source.name}
                        articleLink={data.url}
                    />
                    )}
            </ul>
            <button type='button' className={(numberOfCards+3) >= 100 ? 'list__button_hidden' : 'list__button'} onClick={showMore}>Show more</button>
        </section>
    )
}

export default NewsCardList;