import './Salons.modules.css';

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";

import { getSalonsPerData } from '../../handlers/shared';
import { displayReviewStars } from '../../components/DisplayReviewStars';

export function Salons() {
    const location = useLocation();
    const data = location.state;
    const [salonsData, setSalonsData] = useState([]);

    useEffect(() => {
        const fetchSalons = async () => {
            const response = await getSalonsPerData(data.selectedState, data.selectedCity, data.selectedService);
            setSalonsData(response.salonDetails);
        };
        fetchSalons();
    }, [data]);

    return (
        <div className="salons-container">
            {salonsData.length > 0 ? (
                salonsData.map((salon) => {
                    const backgroundImage = salon.image ? `url(./images/${salon.image})` : `url('./image.png')`;

                    return (
                        <Link
                            to={`/salon/${salon.salon_id}`}
                            key={salon.salon_id}
                            style={{ textDecoration: 'none' }}
                        >
                            <div
                                className="salon-card"
                                style={{
                                    backgroundImage: backgroundImage,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    height: '200px',
                                }}
                            >
                                <div className="salon-details">
                                    <div>
                                        <h3>{salon.name}</h3>
                                        <p><MdLocationPin /> {salon.address}</p>
                                    </div>
                                    <div className="review-summary">
                                        <div className="stars">
                                            {displayReviewStars(salon.averageRating)}
                                        </div>
                                        <p>{salon.reviews.length} reviews</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <div>No salons found for the selected criteria.</div>
            )}
        </div>
    );
}
