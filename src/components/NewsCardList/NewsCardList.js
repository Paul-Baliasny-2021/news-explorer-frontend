import React, { useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import db from '../../utils/db'

function NewsCardList(props) {
    const [numberOfCards, setNumberOfCards] = useState(3);

    function showMore() {
        setNumberOfCards(numberOfCards + 3);
    }

    return (
        <div className="list">
            <h2 className='list__title'>Search results</h2>
            <ul className="list__grid">
                {db.slice(0, numberOfCards).map((data) => (
                    <NewsCard
                        isSignedIn={props.isSignedIn}
                        onBookmarkClick={props.onBookmarkClick}
                        isSavedArticle={props.isSavedArticle}
                        cardData={data}
                        key={data._id}
                        imageLink={data.image}
                        date={data.date}
                        title={data.title}
                        text={data.text}
                        source={data.source}
                        category={data.keyword}
                    />
                ))}
            </ul>
            <button type='button' className='list__button' onClick={showMore}>Show more</button>
        </div>
    )
}

export default NewsCardList;