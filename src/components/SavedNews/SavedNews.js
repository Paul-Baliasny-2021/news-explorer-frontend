import '../NewsCardList/NewsCardList.css';
import SavedArticle from '../SavedArticle/SavedArticle';

function SavedNews(props) {

    return (
        <section className={props.savedArticles.length > 0 ? "list" : "list_hidden"}>
            <ul className="list__grid_saved">
                {props.savedArticles.map((data) => (
                    <SavedArticle
                        onDeleteClick={props.onDeleteClick}
                        cardData={data}
                        key={data._id}
                        imageLink={data.image}
                        date={data.date}
                        title={data.title}
                        text={data.text}
                        source={data.source}
                        articleLink={data.link}
                        category={data.keyword}
                    />
                ))}
            </ul>
        </section>
    )
}

export default SavedNews;