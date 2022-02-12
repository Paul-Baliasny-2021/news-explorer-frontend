import './About.css';
import author from '../../images/author.jpg';

function About() {
    return (
        <article className="about">
            <figure className='about__image-container'><img src={author} alt='Author' className='about__img' /></figure>
            <div className='about__text-container'>
                <h2 className='about__title'>About the author</h2>
                <p className='about__text'>Hi, my name is Pavel (Paul) Baliasny. For the past few months I’ve been studying web development alongside my wonderful fellow students and tutors from Yandex Practicum 100.</p>
                <p className='about__text'>Those were rather tough months full of hard learning, great insights, euphoric achievements and severe challenges, especially for someone with no technical background as myself. I believe with hard persistent work and never-ending learning I can become a valuable member of a web development team.</p>
            </div>
        </article>
    )
}

export default About;