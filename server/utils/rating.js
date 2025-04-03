exports.averageRating = (salon) => {
    if(salon.reviews.length > 0){
        const totalReviews = salon.reviews.length
        const averageRating = salon.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        return salon['stars'] = averageRating
    } else {
        return salon['stars'] = 0
    }
};