import React from 'react';
import Rating from 'react-rating-stars-component';

const RatingStars = ({ initialRating, onRatingChange }) => {
  return (
    <Rating
      count={5}
      onChange={onRatingChange}
      size={24}
      value={initialRating}
      activeColor="#ffd700"
    />
  );
};

export default RatingStars;
