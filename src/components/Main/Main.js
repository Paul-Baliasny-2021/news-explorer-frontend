import About from "../About/About";
import SearchResults from "../SearchResults/SearchResults";

function Main(props) {
    return (
        <div className="main">
            {props.isSearchOn &&
                <SearchResults
                    cards={props.cards}
                    addToSaved={props.addToSaved}
                    showMore={props.showMore}
                    isSearchSuccessful={props.isSearchSuccessful}
                    isSignedIn={props.isSignedIn}
                    onBookmarkClick={props.onBookmarkClick}
                    isSavedArticle={props.isSavedArticle}
                    onDeleteClick={props.onDeleteClick}
                />}
            <About />
        </div>
    )
}

export default Main;