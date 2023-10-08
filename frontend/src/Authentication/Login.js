import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './authentication.css'
import { loginUser } from './Validators/BackendInterface';
import { IoBookOutline } from 'react-icons/io5'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

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
    const token = localStorage.getItem('token')
    try{

      if (token) {
        navigate('/')
      }
    }catch(e){
      console.log(e)
      localStorage.clear();
    }
  }, [navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      };
      const response = await loginUser(userData);
      if (response && response.token) {
        setTimeout(() => {
          
          toast.success('Successfully Logged in', toastProperties);
        }, 1500);
        const token = response.token;
        localStorage.setItem('token', token);
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        toast.error('Invalid credentials. Please try again.', toastProperties);
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Check if you have signed up.', toastProperties);
    }
  };

  return (
    <div className="section">
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
      <div className="text-gray-900 font-medium text-lg flex items-center justify-center">
        <IoBookOutline size={28} /> <span className='mx-2 font-semibold '>Book Store</span>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="authHeading">Log in to your account</h2>
      </div>

      <div className="formDiv">
        <form className="space-y-6" onSubmit={handleLogin}>

          <div>
            <label htmlFor="email" className="inputTagline">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="inputField" />
            </div>
          </div>

          <div>
            <div className="flexBetween">
              <label htmlFor="password" className="inputTagline">Password</label>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="inputField" />
            </div>
          </div>

          <div>
            <button type="submit" className="authBtn">Log in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a Member?
          <Link to={'/Signup'} className="SignFont">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login