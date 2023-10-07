import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidBookAdd } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import { useCart } from '../ContextProvider/CartContext'; 
import { readBooks, addToCart } from './ApiHandlers'; // Import addToCart from ApiHandlers

const BooksPage = () => {
  const { fetchCartItemCount } = useCart();
  const toastProperties = useMemo(() => ({
    position: "top-center",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }), []);
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwt_decode(storedToken);
      const decodedUserId = decodedToken.id;
      setUserId(decodedUserId); 
    } else {
      navigate('/login');
    }

    readBooks(setBooks);
  }, [navigate]);

  const handleAddToCart = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
  
    try {
      const result = await addToCart(userId, id);
      if(result){

        toast.success('Added To Cart', toastProperties);
        fetchCartItemCount(); 
      }else{
        toast.error('Try Again Later', toastProperties);

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
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center">
          {books.map((book) => (
            <div key={book._id} className="lg:w-1/4 md:w-1/2 p-4 w-full border shadow-2xl shadow-gray-300 rounded-2xl lg:mx-6 md:mx-2 my-5">
              <div className="block relative h-48 rounded overflow-hidden">
                <img
                  alt={book.title}
                  className="object-center w-full h-full block object-contain"
                  src={book.imageUrl}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  {book.authors}
                </h3>
                <h2 className="text-gray-900 title-font text-md font-normal">{book.title}</h2>
                <p className="text-gray-400 text-[0.65rem] text-justify">{book.description.slice(0, 100)}{book.description && '...'}</p>
                <div className="flex justify-between items-center my-1">
                  <p className="mt-1">₹{book.price}</p>
                  <button onClick={(e) => handleAddToCart(e, book._id,userId)} className="px-4 py-1 bg-gray-800 hover:bg-black text-white border rounded-2xl whitespace-nowrap">
                    <BiSolidBookAdd className="inline m-1" /> Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksPage;
