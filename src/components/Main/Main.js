import About from "../About/About";
import SearchResults from "../SearchResults/SearchResults";

function Main(props) {
    return (
        <div className="main">
            {props.isSearchOn &&
                <SearchResults
                    showMore={props.showMore}
                    isSearchSuccessful={props.isSearchSuccessful}
                    isSignedIn={props.isSignedIn}
                    onBookmarkClick={props.onBookmarkClick}
                    openSigninModal={props.openSigninModal}
                    savedArticles={props.savedArticles}
                    articles={props.articles}
                    isSaving={props.isSaving}
                />}
            <About />
        </div>
    )
}

export default Main;