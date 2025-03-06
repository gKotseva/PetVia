import './SalonProfile.modules.css'
import { useEffect, useState } from 'react';
import { getSalonDetails } from '../../handlers/salonHandlers';
import { useParams } from 'react-router-dom';
import { parseInfo } from '../../utils/parseInfo';
import { displayReviewStars } from '../../utils/displayReviewStars';
import { Loading } from '../../components/Loading';
import { averageRating } from '../../utils/averageRating';
import { IoIosArrowForward } from "react-icons/io";
import { SalonCalendar } from './SalonCalendar';


export function SalonProfile() {
    const { id } = useParams();
    const [salon, setSalon] = useState({ reviews: [] });
    const [loading, setLoading] = useState(true);
    const [totalRating, setTotalRating] = useState()
    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    useEffect(() => {
        const fetchSalonInfo = async () => {
            try {
                const salonInfo = await getSalonDetails(id);
                const parsedData = parseInfo(salonInfo);
                setTotalRating(averageRating(parsedData))
                setSalon(parsedData);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchSalonInfo();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    const handleCalendarOpen = (service_id) => {
        setSelectedServiceId(service_id);
        setShowCalendar(!showCalendar)
    }

    return (
        <div className="salon-profile-container">
            <div className="salon-information">
                <div className="salon-contact-details">
                    <h1>{salon.name}</h1>
                    <h2>{salon.state}, {salon.city}</h2>
                    <h3>{salon.address}</h3>
                </div>
                <div className="salon-review-stars">
                    <h2>{displayReviewStars(totalRating.averageRating)}</h2>
                    <h3>({totalRating.totalReviews} reviews)</h3>
                </div>
            </div>
            <div className="salon-services">
                <div className="services-container">
                    {salon.services.map(service => (
                        <div className="service-container" key={service.service_id} onClick={() => handleCalendarOpen(service.service_id)}>
                            <h2>{service.service_name}</h2>
                            <h2>{service.duration} minutes</h2>
                            <h2>{service.price}$</h2>
                            <IoIosArrowForward color='white' />
                        </div>
                    ))}
                </div>
                {showCalendar && (
                    <div className="salon-calendar-container">
                        <SalonCalendar serviceId={selectedServiceId} salonId={id}/>
                    </div>
                )}
            </div>
            <div className="salon-team">
                <h1>Meet Our Team</h1>
                <div className="team-members">
                    {salon.team.map(member => (
                        <div className="team-member" key={member.team_member_id}>
                            <img src='/image.png' />
                            <h2>{member.first_name} {member.last_name}</h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className="salon-reviews">
                {salon.reviews.length > 0 ? (
                    salon.reviews.map(review => (
                        <div key={review.review_id} className="review-container">
                            <h1>{displayReviewStars(review.stars)}</h1>
                            <h2>{review.user.first_name} {review.user.last_name}</h2>
                            <h3>{review.date}</h3>
                            <p>{review.review}</p>
                        </div>
                    ))
                ) : (
                    <p>There are no reviews for this salon!</p>
                )}
            </div>
        </div>
    );
}
