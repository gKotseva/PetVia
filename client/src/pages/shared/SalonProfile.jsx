import './SalonProfile.modules.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSalonDetails } from '../../handlers/sharedHandlers';
import { Loading } from '../../components/Loading';
import { displayReviewStars } from '../../components/DisplayReviewStars';
import { IoIosArrowForward } from "react-icons/io";
import { Calendar } from '../../components/Calendar';
import { useAuth } from '../../context/AuthContext';
import { MdLocationPin } from "react-icons/md";

export function SalonProfile() {
    const { id } = useParams();
    const { auth } = useAuth()
    const [salonInfo, setSalonInfo] = useState({})
    const [openCalendar, setOpenCalendar] = useState(false)
    const [selectedService, setSelectedService] = useState(null)

    useEffect(() => {
        const fetchSalonInfo = async () => {
            try {
                const response = await getSalonDetails(id);
                setSalonInfo(response.data)
            } catch (error) {
            }
        };
        fetchSalonInfo();

    }, [id]);

    const showCalendar = (e) => {
        const serviceId = Number(e.currentTarget.dataset.serviceId);
        const service = salonInfo.services.find(s => s.service_id === serviceId);
        setSelectedService(service);
        setOpenCalendar(true);
    };

    return (
        <div className="salon-profile-container">
            {Object.keys(salonInfo).length > 0 ? (
                <>
                    <div className="salon-information">
                        <div className="salon-contact-details">
                            <h1>{salonInfo.salonDetails.name}</h1>
                            <h4><MdLocationPin /> {salonInfo.salonDetails.state}, {salonInfo.salonDetails.city} {salonInfo.salonDetails.address}</h4>
                        </div>
                        <div className="salon-review-stars">
                            <h2>{displayReviewStars(salonInfo.averageRating)}</h2>
                            <h3>( {salonInfo.reviews.length} reviews )</h3>
                        </div>
                    </div>
                    <div className="salon-services">
                        <div className="services-container">
                            {salonInfo.services.map(service => (
                                <div className={`service-container ${Number(selectedService?.service_id) === service.service_id ? 'selected' : ''}`} data-service-id={service.service_id} key={service.service_id} onClick={showCalendar}>
                                    <h2>{service.name}</h2>
                                    <h2>{service.duration} minutes</h2>
                                    <h2>{service.price}$</h2>
                                    <IoIosArrowForward color='black' />
                                </div>
                            ))}
                        </div>
                        {openCalendar &&
                            <Calendar
                                key={selectedService?.service_id}
                                userType='customer'
                                salonId={id}
                                customerId={auth?.id}
                                serviceDuration={selectedService?.duration}
                                service={selectedService}
                                registeredUser={auth?.role}
                            />
                        }
                    </div>
                    <div className="salon-team-about">
                        <div className="salon-team">
                            <h1>Meet Our Team</h1>
                            <div className="team-members">
                                {salonInfo.team.map(member => (
                                    <div className="team-member" key={member.team_member_id}>
                                        <div className="salon-team-member-image">
                                            <img src={`../../../public/images/${member.image}`} />
                                        </div>
                                        <div className="salon-team-member-info">
                                            <h3>{member.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="salon-about-us">
                            <h1>About us</h1>
                            <p>{salonInfo.salonDetails.description}</p>
                        </div>
                    </div>
                    <div className="salon-reviews">
                        {salonInfo?.reviews.length > 0 ? (
                            salonInfo.reviews.map(review => (
                                <div key={review.review_id} className="review-container">
                                    <h1>{displayReviewStars(review.rating)}</h1>
                                    <h2>{review.first_name} {review.last_name}</h2>
                                    <h3>{review.created_at}</h3>
                                    <p>{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p>There are no reviews for this salon!</p>
                        )}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    )
}
