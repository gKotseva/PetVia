export const averageRating = (salonsData) => {
    return salonsData.map(salon => {
        const reviews = JSON.parse(salon.reviews) || [];
        const totalReviews = reviews.length;

        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.stars, 0) / totalReviews
            : 0;

        const rounded = Math.round(averageRating * 2) / 2;

        return {  
            salonName: salon.name,
            totalReviews: totalReviews,
            averageRating: rounded
        };
    });
};
