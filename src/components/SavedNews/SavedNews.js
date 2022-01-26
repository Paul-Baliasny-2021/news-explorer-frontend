import '../NewsCardList/NewsCardList.css';
import savedArticles from '../../utils/constants'
import SavedArticle from '../SavedArticle/SavedArticle';

function SavedNews() {

    function removeFromSaved() {
        console.log('Card will be deleted at the next stage');
    }

    return (
        <div className={savedArticles.length > 0 ? "list" : "list_hidden"}>
            <ul className="list__grid_saved">
                {savedArticles.map((data) => (
                    <SavedArticle
                        onDeleteClick={() => {
                            removeFromSaved();
                        }}
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
        </div>
    )
}

export default SavedNews;