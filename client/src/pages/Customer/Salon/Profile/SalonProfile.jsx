import './SalonProfile.modules.css'

import { useState } from 'react'
import { FaStar } from "react-icons/fa";

export function SalonProfile() {
    const [reviews, setReviews] = useState([
        { stars: 5, name: 'Габи', comment: "Добре", date: '22/09/2024' },
        { stars: 2, name: 'Митко', comment: "Става", date: '22/09/2024' },
        { stars: 4, name: 'Маги', comment: "Много хубаво", date: '22/09/2024' }
    ])

    const [team, setTeam] = useState([
        { image: 'grooming.png', name: 'Габриела' },
        { image: 'grooming.png', name: 'Магдалена' },
        { image: 'grooming.png', name: 'Иван' }
    ])

    return (
        <div className="salon-profile-container">
            <div className="salon-gallery"></div>
            <div className="salon-name">
                <div className="salon-information">
                    <h1>Име Салон</h1>
                    <h2>Адрес</h2>
                </div>
                <div className="salon-reviews-short">
                    <h1>Звезди</h1>
                    <h2>Брой ревюта</h2>
                </div>
            </div>
            <div className="salon-services"></div>
            <div className="salon-about-us"></div>
            <div className="salon-our-team">
                {team.map(e => (
                    <div className="team-member">
                        <img src={e.image} />
                        <h1>{e.name}</h1>
                    </div>
                ))}
            </div>
            <div className="salon-reviews">
                {reviews.map(e => (
                    <div className="review-container">
                        <h1>
                            {Array(e.stars).fill(0).map((_, index) => (
                                <FaStar key={index} color="gold" />
                            ))}
                        </h1>
                        <h2>{e.name}</h2>
                        <p>{e.comment}</p>
                        <p>{e.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}