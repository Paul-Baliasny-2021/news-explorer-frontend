import NewsCardList from "../NewsCardList/NewsCardList";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function SearchResults(props) {
    return (
        <section className="search-results">
            {props.isSearchSuccessful ?
                <NewsCardList
                    articles={props.articles}
                    isSignedIn={props.isSignedIn}
                    onBookmarkClick={props.onBookmarkClick}
                    isSavedArticle={props.isSavedArticle}
                    showMore={props.showMore}
                    cardData={props.cardData}
                    imageLink={props.imageLink}
                    date={props.date}
                    title={props.title}
                    text={props.text}
                    source={props.source}
                />
                :
                <NotFoundPage />
            }
        </section>
    )
}

export default SearchResults;