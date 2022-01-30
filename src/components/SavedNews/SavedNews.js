import '../NewsCardList/NewsCardList.css';
import savedArticles from '../../utils/constants'
import SavedArticle from '../SavedArticle/SavedArticle';
import { convertDateFormat } from '../../utils/constants';

function SavedNews(props) {

    function removeFromSaved() {
        props.onDeleteClick();
    }

    return (
        <section className={savedArticles.length > 0 ? "list" : "list_hidden"}>
            <ul className="list__grid_saved">
                {savedArticles.map((data) => (
                    <SavedArticle
                        onDeleteClick={() => {
                            removeFromSaved();
                        }}
                        cardData={data}
                        key={(Math.random() * 1000)}
                        imageLink={data.urlToImage}
                        date={convertDateFormat(new Date(data.publishedAt))}
                        title={data.title}
                        text={data.content}
                        source={data.source.name}
                        category={props.category}
                    />
                ))}
            </ul>
        </section>
    )
}

export default SavedNews;