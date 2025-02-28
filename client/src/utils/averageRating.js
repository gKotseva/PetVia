export const averageRating = (salonsData) => {
    const salonsArray = Array.isArray(salonsData) ? salonsData : [salonsData];
    
    const ratings =  salonsArray.map(salon => {
        const reviews = typeof salon.reviews === 'string' ? JSON.parse(salon.reviews) : salon.reviews || [];
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
    return salonsArray.length === 1 ? ratings[0] : ratings;

};
