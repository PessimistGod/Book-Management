import axios from 'axios';

import jwtDecode from 'jwt-decode';

export async function readBooks(setBooks) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/booksList/read`);
    setBooks(response.data);
  } catch (error) {
    console.error(error);
  }
}

export async function addToCart(userId, bookId) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cart/create`, {
      userId,
      bookId,
      quantity: 1,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchCartItemCount = async (setCartCount, userId) => {
    try {
      // Replace this with your actual API endpoint to fetch cart items count
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/count/${userId}`);
      const data = await response.json();
      const totalCount = data.totalCount || 0;
      setCartCount(totalCount);
    } catch (error) {
      console.error('Error fetching cart items count:', error);
    }
  };




export const fetchCartItems = async (uid) => {
  try {
    const token = localStorage.getItem('token');
    const decodeToken = jwtDecode(token);

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/cart/read/${decodeToken.id}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching cart items with book details:', error);
    return [];
  }
};

export const updateCartItemQuantity = async (uid, cartItemId, newQuantity) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL}/api/cart/update/${uid}/${cartItemId}`,
      { quantity: newQuantity }
    );

    return true;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return false;
  }
};

export const removeCartItem = async (uid, cartItemId) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/cart/delete/${uid}/${cartItemId}`
    );

    return true;
  } catch (error) {
    console.error('Error removing cart item:', error);
    return false;
  }
};

export const recalculateTotalPrice = (cartItems) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.bookId.price * item.quantity;
  });
  return total;
};
