import axios from 'axios';

import jwtDecode from 'jwt-decode';

export async function readBooks(setBooks, setTotalPages, currentPage) {
  try {
    const perPage = 10; // Change this value to set the number of books per page
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/booksList/read?page=${currentPage}&perPage=${perPage}`
    );
    const responseData = response.data;
    setBooks(responseData.books);
    setTotalPages(responseData.totalPages);
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


export async function searchBooks(setSearchResults, setTotalPages, searchQuery, currentPage) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/booksList/search`, {
      params: {
        query: searchQuery,
        page: currentPage,
      },
    });

    if (response.status === 200) {
      setSearchResults(response.data.books);
      setTotalPages(response.data.totalPages); // Update the total pages
      return { books: [], totalPages: 0 };
    }
  } catch (error) {
    console.error(error);
  }
}
