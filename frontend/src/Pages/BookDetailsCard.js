import React, { useEffect, useState } from 'react';
import RatingStars from './Rating'; // Correct the import
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const BookDetailsCard = ({ book, closeDetail, addToCart, onRatingSubmit, toastProperties }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/login');
      return;
    }

    const decodedToken = jwt_decode(storedToken);
    setUserId(decodedToken.id);


  }, [navigate]);
  const handleRatingChange = async (newRating) => {
    setRating(newRating);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/booksList/${book._id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, rating: newRating }),

      });

      if (response.ok) {
        toast.success('Rating submitted successfully', toastProperties);
        onRatingSubmit(book._id, rating);
        setRating(0);
      } else {
        toast.error('Failed to submit rating', toastProperties);
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className="fixed inset-0 z-[99] flex justify-center items-center bg-opacity-80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-2/3 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
          onClick={closeDetail}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center w-full">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="mx-auto h-48 w-48 object-cover rounded-full"
          />
          <h2 className="text-2xl font-semibold text-gray-900 mt-4">{book.title}</h2>
          <p className="text-sm text-gray-600">{book.authors}</p>
          <div className="mt-4 text-gray-700 max-h-72 overflow-y-auto">{book.description}</div>
          <p className="text-gray-700 mt-4">Price: ₹{book.price}</p>
          <p className="text-gray-700 mt-2">Language: {book.language}</p>
          <p className="text-gray-700 mt-2">Publication Date: {book.publicationDate}</p>

          <button
            onClick={(e) => addToCart(e, book._id)}
            className="px-4 py-2 mt-4 bg-gray-800 text-white rounded-md hover:bg-black focus:outline-none"
          >
            Add to Cart
          </button>
          <div className='flex justify-center'>
          <RatingStars initialRating={rating} onRatingChange={handleRatingChange}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCard;
