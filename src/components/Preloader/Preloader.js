import './Preloader.css';

function Preloader() {
    return (
        <div className="preloader__area">
            <span className="preloader__circle"></span>
            <p className='preloader__text'>Searching for news...</p>
        </div>
    )
}

export default Preloader;