import React, { useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { convertDateFormat } from '../../utils/constants';

function NewsCardList(props) {
    const [numberOfCards, setNumberOfCards] = useState(3);

    function showMore() {
        // props.showMore();
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
                        isSavedArticle={props.isSavedArticle}
                        cardData={data}
                        key={(Math.random() * 1000)}
                        imageLink={data.urlToImage}
                        date={convertDateFormat(new Date(data.publishedAt))}
                        title={data.title}
                        text={data.content}
                        source={data.source.name}
                        articleLink={data.url}
                    />
                    )}
            </ul>
            <button type='button' className='list__button' onClick={showMore}>Show more</button>
        </section>
    )
}

export default NewsCardList;