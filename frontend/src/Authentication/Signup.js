import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleEmail, handlePassword, handleConfirmPass } from './Validators/EmailAndPassword';
import { signUpUser } from './Validators/BackendInterface';
import { resetForm } from './resetForm';
import { IoBookOutline } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './authentication.css'
const Signup = () => {

  const navigate = useNavigate();

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

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  const [isValidEmail, setValidEmail] = useState(false);
  const [isValidPass, setValidPass] = useState(false);
  const [isConfirmPass, setIsConfirmPass] = useState(false);

  const [spanEmail, setSpanEmail] = useState('');
  const [spanPass, setSpanPass] = useState('');
  const [spanCPass, setSpanCPass] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');



  async function handleEmailValidation(email) {
    const message = await handleEmail(email, setValidEmail);
    setSpanEmail(message);
  }


  function PasswordValid(password) {
    const message = handlePassword(password, setValidPass)
    setSpanPass(message)
  }

  function confirmPassValidation(confirmPass) {
    const message = handleConfirmPass(password, confirmPass, setIsConfirmPass);
    setSpanCPass(message);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isValidEmail && isValidPass && isConfirmPass) {
      try {
        const userData = {
          name,
          company,
          email,
          password,
        };
        const response = await signUpUser(userData);
        if(response){
          setTimeout(() => {
            
            toast.success('Signup successful!', toastProperties);
          }, 1500);
          navigate('/login')
        }else{
        toast.error('Error signing up', toastProperties)

        }

        resetForm(setName, setCompany, setEmail, setValidEmail, setValidPass, setIsConfirmPass, setSpanEmail, setSpanPass, setSpanCPass, setPassword, setConfirmPass);


      } catch (error) {
        console.error('Error signing up:', error);
        toast.error('Error signing up', toastProperties)
      }
    }
  }


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

        <h2 className="authHeading">Create Your Account </h2>
      </div>

      <div className="formDiv">
        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
            <div>
              <label htmlFor="name" className="inputTagline">Full Name</label>
              <div className="mt-2">
                <input id="name" name="name" type="name" autoComplete="name" onChange={(e) => setName(e.target.value)} value={name} required className="inputField" />
              </div>
            </div>



          </div>


          <div>
            <label htmlFor="email" className="inputTagline">Email address</label>
            <div className="mt-2">
              <input id="email" name="email" onChange={(e) => { setEmail(e.target.value); handleEmailValidation(e.target.value) }} value={email} type="email" autoComplete="email" required className="inputField" />
            </div>
            {spanEmail && spanEmail}

          </div>

          <div>
            <div className="flexBetween">
              <label htmlFor="password" className="inputTagline">Password</label>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" onChange={(e) => { setPassword(e.target.value); PasswordValid(e.target.value) }} value={password} autoComplete="current-password" required className="inputField" />
            </div>

            {spanPass && spanPass}
          </div>

          <div>
            <div className="flexBetween">
              <label htmlFor="confirmPass" className="inputTagline">Confirm Password</label>
            </div>
            <div className="mt-2">
              <input id="confirmPass" name="confirmPass" type="password" onChange={(e) => { setConfirmPass(e.target.value); confirmPassValidation(e.target.value) }} value={confirmPass} autoComplete="current-password" required className="inputField" />
            </div>
            {spanCPass && spanCPass}
          </div>

          <div>
            <button type="submit" className="authBtn">Sign Up</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a Member?
          <Link to={'/Login'} className="SignFont">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup