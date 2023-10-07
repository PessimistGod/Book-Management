import axios from 'axios';


export async function signUpUser(userData) {
  try {
    console.log(process.env.REACT_APP_API_URL);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up user:', error);
    throw error;
  }
}

export async function loginUser(userData){
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, userData);
        return response.data;
      } catch (error) {
        console.error('Error Login user:', error);
        throw error;
      }
}