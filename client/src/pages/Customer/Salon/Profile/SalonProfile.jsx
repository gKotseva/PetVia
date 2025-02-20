import './SalonProfile.modules.css'

import { useContext, useEffect, useState } from 'react'
import { IoStar } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { DateContext } from '../../../../context/DateContext';
import { useParams } from 'react-router-dom';
import { getSalonDetails } from '../../../../handlers/salonHandler';

export function SalonProfile() {
    const { id } = useParams();
    const [salonData, setSalonData] = useState([])
    const [team, setTeam] = useState([])
    const [reviews, setReviews] = useState([])
    const [services, setServices] = useState([])
    const [bookings, setBookings] = useState([])
    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        const fetchSalonDetails = async () => {
            const result = await getSalonDetails(id)
            setSalonData(result)
        }
        fetchSalonDetails()
    }, [id])

    useEffect(() => {
        if (salonData.length > 0 && salonData[0]?.team) {
            try {
                setTeam(JSON.parse(salonData[0].team));
                setReviews(JSON.parse(salonData[0].reviews))
                setServices(JSON.parse(salonData[0].services))
                setBookings(JSON.parse(salonData[0].bookings))
                setSchedule(JSON.parse(salonData[0].schedule))
            } catch (error) {
                console.error("Error parsing team data:", error);
            }
        } else {
            console.log("Waiting for salonData to be populated...");
        }
    }, [salonData]);

    const averageStars = reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length
        : 0;


    const [showDates, setShowDates] = useState(null);
    const { datesOfTheMonth } = useContext(DateContext);
    const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

    const showSchedule = (index) => {
        setSelectedServiceIndex(selectedServiceIndex === index ? null : index);
    }

    return (
        salonData.length > 0 ?
            <div className="salon-profile-container">
                {/* <div className={`salon-gallery ${images.length >= 5 ? "five-or-more" : "less-than-five"}`}>
                {images.map((e, index) => (
                    <img key={index} src={e} alt={`Salon ${index + 1}`} />
                ))}
            </div> */}
                <div className="salon-name">
                    <div className="salon-information">
                        <h1>{salonData[0].name}</h1>
                        <h3>{salonData[0].state} {salonData[0].city} {salonData[0].address}</h3>
                    </div>
                    <div className="salon-reviews-short">
                        {Array.from({ length: 5 }, (_, i) => (
                            <IoStar
                                key={i}
                                color={i < Math.round(averageStars) ? "gold" : "gray"}
                            />
                        ))}
                        <h5>{reviews.length} reviews</h5>
                    </div>
                </div>
                <div className="salon-services">
                    <div className="services-wrapper">
                        <div className="services-container">
                            {services.map((e, index) => (
                                <div key={index} className="service-container">
                                    <div className="service" onClick={() => showSchedule(index)}>
                                        <h2 className="name">{e.service_name}</h2>
                                        <h2>({e.duration}min)</h2>
                                        <h2 className="price">{e.price} $</h2>
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
                            <p>{salonData[0].salon_description}</p>
                        </div>
                        <div className="salon-our-team">
                            {team.map((e) => (
                                <div className="team-member" key={e.firstName}>
                                    <img src={'/woman1.jpg'} alt={e.firstName} />
                                    <h1>{e.first_name} {e.last_name}</h1>
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
                                <h2>{e.user.first_name} {e.user.last_name}</h2>
                                <p>{e.review}</p>
                                <p>{e.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            : <p>Loading</p>
    );
}
