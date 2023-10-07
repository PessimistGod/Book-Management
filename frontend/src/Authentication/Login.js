import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './authentication.css'
import { loginUser } from './Validators/BackendInterface';
import { IoBookOutline } from 'react-icons/io5'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');



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
      console.log('Signup successful:', response);

      const token = response.token;


      localStorage.setItem('token', token);

      setEmail('')
      setPassword('')

      navigate('/');



    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="section">
      <div className="text-gray-900 font-medium text-lg flex items-center justify-center">
        <IoBookOutline size={28} /> <span className='mx-2 font-semibold '>Book Store</span>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="authHeading">Sign in to your account</h2>
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
            <button type="submit" className="authBtn">Sign in</button>
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