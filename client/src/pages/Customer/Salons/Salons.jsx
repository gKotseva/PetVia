import './Salons.modules.css';

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSalonsPerData } from "../../../handlers/salonHandler";
import { IoStar } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";

export function Salons() {
    const location = useLocation();
    const data = location.state;
    const [salonsData, setSalonsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalons = async () => {
            setLoading(true);
            const response = await getSalonsPerData(data.selectedState, data.selectedCity, data.selectedService);
            setSalonsData(response);
            setLoading(false);
        };
        fetchSalons();
    }, [data]);

    if (loading) {
        return <div>Loading salons...</div>;
    }

    return (
        <div className="salons-container">
            {salonsData.length > 0 ? (
                salonsData.map(e => {
                    const reviews = JSON.parse(e.reviews);
                    const reviewCount = reviews.length;
                    const averageStars = reviewCount > 0
                        ? reviews.reduce((acc, review) => acc + review.stars, 0) / reviewCount
                        : 0;
                        const backgroundImage = e.image ? `url(${e.image})` : '';

                        return (
                            <div
                                className="salon-card"
                                style={{
                                    backgroundImage: backgroundImage,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    height: '200px',
                                }}
                                key={e.salon_id}
                            >
                            <div className="salon-details">
                                <div>
                                    <h3>{e.salon_name}</h3>
                                    <p><MdLocationPin /> {e.address}</p>
                                </div>
                                <div className="review-summary">
                                    <div className="stars">
                                        {Array.from({ length: Math.round(averageStars) }, (_, i) => (
                                            <IoStar key={i} color="gold" />
                                        ))}
                                        {averageStars && !Number.isInteger(averageStars) && (
                                            <IoStar color="gray" />
                                        )}
                                    </div>
                                    <p>{reviewCount} reviews</p>
                                    <p>Average Rating: {averageStars.toFixed(1)}</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div>No salons found for the selected criteria.</div>
            )}
        </div>
    );
}
