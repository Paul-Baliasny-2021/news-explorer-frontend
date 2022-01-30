import './About.css';
import author from '../../images/author.jpg';

function About() {
    return (
        <article className="about">
            <figure className='about__image-container'><img src={author} alt='Author' className='about__img' /></figure>
            <div className='about__text-container'>
                <h2 className='about__title'>About the author</h2>
                <p className='about__text'>This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.</p>
                <p className='about__text'>You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.</p>
            </div>
        </article>
    )
}

export default About;