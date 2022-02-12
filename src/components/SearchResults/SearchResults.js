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
                    openSigninModal={props.openSigninModal}
                    savedArticles={props.savedArticles}
                    isSaving={props.isSaving}
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