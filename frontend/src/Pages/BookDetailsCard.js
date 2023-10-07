import React from 'react';
import Rating from './Rating';

const BookDetailsCard = ({ book, closeDetail, addToCart, handleRatingSubmit }) => {
  return (
    <div className="fixed inset-0 z-[99] flex justify-center items-center bg-opacity-80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white p-6 rounded-lg w-2/3 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
          onClick={closeDetail}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        <div className="text-center">
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
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add to Cart
          </button>

          <Rating bookId={book._id} handleRatingSubmit={handleRatingSubmit} />
        </div>
      </div>
    </div>
  );
};

export default BookDetailsCard;
