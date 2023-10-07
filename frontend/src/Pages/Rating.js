import React, { useState } from 'react';
import RatingStars from 'react-rating-stars-component';

const Rating = ({ bookId, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (newRating > 0) {
      onRatingSubmit(bookId, newRating);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-gray-700">Rate this book:</h3>
      <RatingStars
        count={5}
        size={30}
        isHalf={false}
        value={rating}
        onChange={handleRatingChange}
        activeColor="#ffd700"
      />
    </div>
  );
};

export default Rating;
