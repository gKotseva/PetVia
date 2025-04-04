import { IoStar } from "react-icons/io5";

export const displayReviewStars = (rating) => {
    return (
        <div>
            {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>{index < rating ? <IoStar color="gold"/> : <IoStar color="grey" />}</span>
            ))}
        </div>
    );
}
