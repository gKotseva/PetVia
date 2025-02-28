import './Salons.modules.css';

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";

import { getSalonsPerData } from "../../handlers/salonHandlers";
import { averageRating } from '../../utils/averageRating';
import { displayReviewStars } from '../../utils/displayReviewStars';
import { Loading } from '../../components/Loading';

export function Salons() {
    const location = useLocation();
    const data = location.state;
    const [salonsData, setSalonsData] = useState([]);
    const [ratings, setRatings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalons = async () => {
            try {
                const response = await getSalonsPerData(data.selectedState, data.selectedCity, data.selectedService);
                setSalonsData(response);
                setRatings(averageRating(response));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchSalons();
    }, [data]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="salons-container">
            {salonsData.length > 0 ? (
                salonsData.map((salon) => {
                    const backgroundImage = salon.image ? `url(${salon.image})` : './image.png';

                    const ratingData = ratings && Array.isArray(ratings)
                        ? ratings.find(r => r.salonName === salon.name) || { averageRating: "No reviews ⭐", totalReviews: 0 }
                        : ratings;

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
                                            {displayReviewStars(ratingData.averageRating)}
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
