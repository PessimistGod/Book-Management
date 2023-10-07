import React, { useState, useEffect, useMemo } from 'react';
import jwtDecode from 'jwt-decode';
import { fetchCartItems, updateCartItemQuantity, removeCartItem, recalculateTotalPrice } from './ApiHandlers';
import { BiPlus, BiMinus } from 'react-icons/bi'
import {IoBagCheckOutline} from 'react-icons/io5'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useCart } from '../ContextProvider/CartContext'; 

const Cart = () => {
  const { fetchCartItemCount } = useCart();

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [uid, SetUid] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
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

  useEffect(() => {
    const fetchUserCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodeToken = jwtDecode(token);
        SetUid(decodeToken.id);

        const data = await fetchCartItems(decodeToken.id);
        setCartItems(data);

        // Calculate the total price based on item quantity
        const total = recalculateTotalPrice(data);
        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching cart items with book details:', error);
      }
    };

    fetchUserCartItems();
  }, []);

  useEffect(() => {
    // Recalculate the total price when cartItems change
    const total = recalculateTotalPrice(cartItems);
    setTotalPrice(total);
  }, [cartItems]);

  const handleUpdateCartItemQuantity = async (cartItemId, newQuantity) => {
    const success = await updateCartItemQuantity(uid, cartItemId, newQuantity);

    if (success) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveCartItem = async (cartItemId) => {
    const success = await removeCartItem(uid, cartItemId);

    if (success) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== cartItemId)
      );
      fetchCartItemCount();
    }

  };

  const clearUserCart = async (userId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cart/clearCart/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };
  
  const handleCheckout = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      const clearCartResponse = await clearUserCart(uid);
  
      if (clearCartResponse.message === 'Cart cleared successfully') {
        setCartItems([]);
        setTotalPrice(0);
        setCheckoutSuccess(true);
  
        toast.success('Payment Successful', toastProperties);
        fetchCartItemCount(); 
      } else {
        toast.error('Failed to clear cart', toastProperties);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      toast.error('Server Busy', toastProperties);
    } finally {
      setShowCheckoutModal(false);
    }
  };

  return (
    <div className="container mx-auto mt-6 min-h-screen">
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
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">Product</th>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Author</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Quantity</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="py-2 px-4 border">
                    <img
                      src={item.bookId.imageUrl}
                      alt={item.bookId.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4 border">{item.bookId.title}</td>
                  <td className="py-2 px-4 border">{item.bookId.authors}</td>
                  <td className="py-2 px-4 border">₹{item.bookId.price}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleUpdateCartItemQuantity(item._id, item.quantity - 1)}
                      className="text-red-500 hover:underline m-auto"
                      disabled={item.quantity === 1}
                    >
                      <BiMinus size={15}/>
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => handleUpdateCartItemQuantity(item._id, item.quantity + 1)}
                      className="text-blue-500 hover:underline m-auto"
                    >
                      <BiPlus size={15}/>
                    </button>
                  </td>
                  <td className="py-2 px-4 border">
                    ₹{(item.bookId.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleRemoveCartItem(item._id)}
                      className="text-gray-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="text-right mt-6 flex justify-around items-center">
          <p className="text-lg font-semibold">
            Total: <span className='text-md text-gray-700 mx-1'>₹ {Math.ceil(totalPrice.toFixed(2))}</span>
          </p>
          <button
            onClick={() => setShowCheckoutModal(true)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-black flex items-center justify-center"
          >
            <IoBagCheckOutline size={20} className='mx-2'/>Checkout
          </button>
        </div>
      )}

      {showCheckoutModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            {!checkoutSuccess ? (
              <div>
                <p className="text-lg font-semibold mb-4">
                  Confirm your purchase
                </p>
                <p className="mb-4">
                  Total Price: ₹ {Math.ceil(totalPrice.toFixed(2))}
                </p>
                <button
                  onClick={handleCheckout}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-black mx-4"
                >
                  Confirm Payment
                </button>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="text-gray-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold mb-4">Payment Successful!</p>
                <p>Your order has been placed.</p>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
