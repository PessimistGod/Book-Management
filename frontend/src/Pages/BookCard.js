import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiEditAlt, BiSolidBookAdd } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useCart } from '../ContextProvider/CartContext';
import BookDetailsCard from './BookDetailsCard';

const BookCard = ({ book, handleAddToCart, handleDeleteBook, handleRatingSubmit }) => {
  const navigate = useNavigate();
  const { userId } = useCart();
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false);

  const handleSelectBook = () => {
    setIsBookDetailsOpen(true);
  };

  const closeBookDetails = () => {
    setIsBookDetailsOpen(false);
  };

  return (
    <>
      <div className="lg:w-1/4 md:w-1/2 p-4 w-full border shadow-2xl shadow-gray-300 rounded-2xl lg:mx-6 md:mx-2 my-5">
        <div className="block relative h-48 rounded overflow-hidden">
          <div className="absolute right-3 z-50 flex flex-col">
            <button onClick={() => { navigate(`/editBook/${book._id}`); }} className="my-2 text-green-700">
              <BiEditAlt size={22} />
            </button>
            <button onClick={() => handleDeleteBook(book._id)} className="my-2 text-red-700">
              <MdDelete size={22} />
            </button>
          </div>
          <img
            alt={book.title}
            className="object-center w-1/2 mx-auto h-full block object-contain"
            src={book.imageUrl}
          />
        </div>
        <div className="mt-4" onClick={handleSelectBook}>
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {book.authors}
          </h3>
          <h2 className="text-gray-900 title-font text-md font-normal">{book.title}</h2>
          <p className="text-gray-400 text-[0.65rem] text-justify">{book.description.slice(0, 100)}{book.description && '...'}</p>
          <div className="flex justify-between items-center my-1">
            <p className="mt-1">₹{book.price}</p>
            <button onClick={(e) => handleAddToCart(e, book._id, userId)} className="px-4 py-1 bg-gray-800 hover:bg-black text-white border rounded-2xl whitespace-nowrap">
              <BiSolidBookAdd className="inline m-1" /> Add To Cart
            </button>
          </div>
        </div>
      </div>
      {isBookDetailsOpen && (
        <BookDetailsCard
          book={book}
          closeDetail={closeBookDetails}
          addToCart={(e) => handleAddToCart(e, book._id, userId)}
          handleRatingSubmit={handleRatingSubmit}
        />
      )}
    </>
  );
};

export default BookCard;
