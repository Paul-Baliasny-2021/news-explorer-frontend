import NewsCardList from "../NewsCardList/NewsCardList";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function SearchResults(props) {
    return (
        <div className="search-results">
            {props.isSearchSuccessful ?
            <NewsCardList 
            isSignedIn={props.isSignedIn} 
            onBookmarkClick={props.onBookmarkClick} 
            isSavedArticle={props.isSavedArticle} 
            onDeleteClick={props.onDeleteClick}
            />
            :
            <NotFoundPage />
            }
        </div>
    )
}

export default SearchResults;