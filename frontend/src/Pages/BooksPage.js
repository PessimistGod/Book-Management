import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import { useCart } from '../ContextProvider/CartContext';
import { readBooks, addToCart, searchBooks } from './ApiHandlers';
import BookCard from './BookCard';
import SearchForm from './SearchForm';
import Pagination from './Pagination';
import BookDetailsCard from './BookDetailsCard';

const BooksPage = () => {
  const { fetchCartItemCount } = useCart();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  

  const toastProperties = useMemo(() => ({
    position: 'top-center',
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  }), []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    try{

      if (!storedToken) {
        navigate('/login');
        return;
      }
    }catch(e){
      console.log(e)
      localStorage.clear()
    }

    const decodedToken = jwt_decode(storedToken);
    setUserId(decodedToken.id);

    if (searchQuery === '') {
      readBooks(setBooks, setTotalPages, currentPage);
    } else {
      searchBooks(setSearchResults, setTotalPages, searchQuery, currentPage); // Update here
    }
  }, [currentPage, navigate, searchQuery]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const result = await addToCart(userId, id);
      if (result) {
        toast.success('Added To Cart', toastProperties);
        fetchCartItemCount();
      } else {
        toast.error('Try Again Later', toastProperties);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/booksList/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.status === 204) {
          toast.success('Book Deleted Successfully', toastProperties);
          readBooks(setBooks);
          setCurrentPage(1);
        } else {
          toast.error('Failed to Delete Book', toastProperties);
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while deleting the book', toastProperties);
      }
    }
  };

  const handleRatingSubmit = async (bookId, rating) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/booksList/${bookId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, rating }),
      });

      if (response.ok) {
        toast.success('Rating submitted successfully', toastProperties);
      } else {
        toast.error('Failed to submit rating', toastProperties);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section className="text-gray-600 body-font">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div>
        {selectedBook && (
          <BookDetailsCard book={selectedBook} closeDetail={() => setSelectedBook(null)} addToCart={(e) => handleAddToCart(e, selectedBook._id)} userId={userId}
          onRatingSubmit={handleRatingSubmit} toast={toast} toastProperties={toastProperties}
          />
        )}
      </div>

      <div className="container px-5 py-24 mx-auto">
        <SearchForm searchQuery={searchQuery} handleSearchInputChange={handleSearchInputChange} />

        <div className="flex flex-wrap -m-4 justify-center">
          {searchQuery === '' ? (
            books.map((book) => (
              <BookCard key={book._id} book={book} handleAddToCart={handleAddToCart} handleDeleteBook={handleDeleteBook} />
            ))
          ) : (
            searchResults.map((book) => (
              <BookCard key={book._id} book={book} handleAddToCart={handleAddToCart} handleDeleteBook={handleDeleteBook} />
            ))
          )}
        </div>
      </div>

      <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </section>
  );
};

export default BooksPage;
