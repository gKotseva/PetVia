import './SalonProfile.modules.css'

import { useContext, useState } from 'react'
import { IoStar } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { DateContext } from '../../../../context/DateContext';

export function SalonProfile() {
    const [reviews, setReviews] = useState([
        { stars: 5, name: 'Gabi', comment: "Good", date: '22/09/2024' },
        { stars: 2, name: 'Mitko', comment: "Okay", date: '22/09/2024' },
        { stars: 4, name: 'Magi', comment: "Very nice", date: '22/09/2024' },
    ])

    const [team, setTeam] = useState([
        { image: 'woman1.jpg', name: 'Gabriela' },
        { image: 'woman2.jpg', name: 'Magdalena' },
        { image: 'man1.jpg', name: 'Ivan' },
        { image: 'man1.jpg', name: 'Ivan' },
    ])

    const [images, setImages] = useState(['salon-header-1.jpg', 'salon-header-2.jpg', 'salon-header-3.jpg', 'salon-header-4.jpg', 'salon-header-5.jpg'])

    const [services, setServices] = useState([
        { name: 'Bath and Drying', price: 35 },
        { name: 'Haircut', price: 50 },
        { name: 'Brushing', price: 25 },
        { name: 'Nail Cutting', price: 22 },
        { name: 'Ear Cleaning', price: 18 },
        { name: 'Teeth Cleaning', price: 30 },
        { name: 'Aromatic Bath', price: 40 },
        { name: 'Massage', price: 45 },
        { name: 'Deworming', price: 38 },
        { name: 'Eye Cleaning', price: 20 },
        { name: 'Full Grooming', price: 80 }
    ])

    const [showDates, setShowDates] = useState(null);
    const { datesOfTheMonth } = useContext(DateContext);
    const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
    
    const showSchedule = (index) => {
        setSelectedServiceIndex(selectedServiceIndex === index ? null : index);
    }

    return (
        <div className="salon-profile-container">
            <div className={`salon-gallery ${images.length >= 5 ? "five-or-more" : "less-than-five"}`}>
                {images.map((e, index) => (
                    <img key={index} src={e} alt={`Salon ${index + 1}`} />
                ))}
            </div>
            <div className="salon-name">
                <div className="salon-information">
                    <h1>Fluffy Kingdom</h1>
                    <h3>Vasil Levski 42, Plovdiv, 4000</h3>
                </div>
                <div className="salon-reviews-short">
                    <h1><IoStar color="gold" /><IoStar color="gold" /><IoStar color="gold" /><IoStar color="gold" /></h1>
                    <h5>{reviews.length} reviews</h5>
                </div>
            </div>
            <div className="salon-services">
                <div className="services-wrapper">
                    <div className="services-container">
                        {services.map((e, index) => (
                            <div key={index} className="service-container">
                                <div className="service" onClick={() => showSchedule(index)}>
                                    <h2 className="name">{e.name}</h2>
                                    <h2 className="price">{e.price} BGN</h2>
                                    <IoIosArrowForward color="#f31559" className="arrow" />
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedServiceIndex !== null && (
                        <div className="dates">
                            {datesOfTheMonth.map((date, index) => (
                                <div className="day" key={index}>
                                    <h4>{date}</h4>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="about-us-container">
                <h1>Meet Us</h1>
                <div className="container1">
                    <div className="salon-about-us">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil nulla ipsa quasi corporis iste iusto at officia, nesciunt fugiat necessitatibus eligendi odio distinctio atque qui aliquam autem incidunt nisi rerum.</p>
                    </div>
                    <div className="salon-our-team">
                        {team.map((e) => (
                            <div className="team-member" key={e.name}>
                                <img src={e.image} alt={e.name} />
                                <h1>{e.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="salon-reviews">
                <h1>Our Reviews</h1>
                <div>
                    {reviews.map((e) => (
                        <div className="review-container" key={e.name}>
                            <h1>
                                {Array(e.stars)
                                    .fill(0)
                                    .map((_, index) => (
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
    );
}
