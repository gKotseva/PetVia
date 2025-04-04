exports.averageRating = (salonOrReviews) => {
    const reviews = Array.isArray(salonOrReviews) ? salonOrReviews : salonOrReviews?.reviews || [];
    
    if (reviews.length > 0) {
        const totalReviews = reviews.length;
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
        return averageRating;
    }
    
    return 0;
};
