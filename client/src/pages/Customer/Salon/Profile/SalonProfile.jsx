import './SalonProfile.modules.css'

import { useState } from 'react'
import { IoStar } from "react-icons/io5";

export function SalonProfile() {
    const [reviews, setReviews] = useState([
        { stars: 5, name: 'Габи', comment: "Добре", date: '22/09/2024' },
        { stars: 2, name: 'Митко', comment: "Става", date: '22/09/2024' },
        { stars: 4, name: 'Маги', comment: "Много хубаво", date: '22/09/2024' },
    ])

    const [team, setTeam] = useState([
        { image: 'woman1.jpg', name: 'Габриела' },
        { image: 'woman2.jpg', name: 'Магдалена' },
        { image: 'man1.jpg', name: 'Иван' },
        { image: 'man1.jpg', name: 'Иван' },
    ])

    const [images, setImages] = useState(['salon-header-1.jpg', 'salon-header-2.jpg', 'salon-header-3.jpg', 'salon-header-4.jpg', 'salon-header-5.jpg'])

    return (
        <div className="salon-profile-container">
            <div className={`salon-gallery ${images.length >= 5 ? "five-or-more" : "less-than-five"}`}>
                {images.map((e, index) => (
                    <img key={index} src={e} alt={`Salon ${index + 1}`} />
                ))}
            </div>
            <div className="salon-name">
                <div className="salon-information">
                    <h1>Пухкавото Кралство</h1>
                    <h3>ул. Васил Левски 42, гр. Пловдив, 4000</h3>
                </div>
                <div className="salon-reviews-short">
                    <h1><IoStar color="gold" /><IoStar color="gold" /><IoStar color="gold" /><IoStar color="gold" /></h1>
                    <h5>{reviews.length} ревюта</h5>
                </div>
            </div>
            <div className="salon-services"></div>
            <div className="about-us-container">
                <h1>Запознай се с нас</h1>
                <div className='container1'>
                    <div className="salon-about-us">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nulla ipsa quasi corporis iste iusto at officia, nesciunt fugiat necessitatibus eligendi odio distinctio atque qui aliquam autem incidunt nisi rerum.</p>
                    </div>
                    <div className="salon-our-team">
                        {team.map(e => (
                            <div className="team-member">
                                <img src={e.image} />
                                <h1>{e.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="salon-reviews">
                <h1>Нашите оценки</h1>
                <div>
                    {reviews.map(e => (
                        <div className="review-container">
                            <h1>
                                {Array(e.stars).fill(0).map((_, index) => (
                                    <IoStar key={index} color="gold" />
                                ))}
                            </h1>
                            <h2>{e.name}</h2>
                            <p>{e.comment}</p>
                            <p>{e.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}