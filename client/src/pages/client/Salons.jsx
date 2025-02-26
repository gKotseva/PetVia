import './Salons.modules.css';

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";

import { getSalonsPerData } from "../../handlers/salonHandlers";
import { averageRating } from '../../utils/averageRating';

export function Salons() {
    const location = useLocation();
    const data = location.state;
    const [salonsData, setSalonsData] = useState([]);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchSalons = async () => {
            const response = await getSalonsPerData(data.selectedState, data.selectedCity, data.selectedService);
            setSalonsData(response);
        };
        fetchSalons();
    }, [data]);

    useEffect(() => {
        if (salonsData.length > 0) {
            const result = averageRating(salonsData);
            setRatings(result);
        }
    }, [salonsData]);

    return (
        <div className="salons-container">
            {salonsData.length > 0 ? (
                salonsData.map((salon, index) => {
                    const backgroundImage = salon.image ? `url(image.png)` : './image.png';

                    const ratingData = ratings.find(r => r.salonName === salon.name) || {
                        averageRating: "No reviews ⭐",
                        totalReviews: 0
                    };

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
                                            {Array.from({ length: 5 }, (_, i) => (
                                                <IoStar
                                                    key={i}
                                                    color={i < Math.round(ratingData.averageRating) ? "gold" : "gray"}
                                                />
                                            ))}
                                        </div>
                                        <p>{ratingData.totalReviews} reviews</p>
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
