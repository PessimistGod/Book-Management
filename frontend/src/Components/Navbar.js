import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



const Navbar = () => {
    const navigate = useNavigate();
    function handleLogout(){
        const token = localStorage.getItem('token');
        if(token){
            localStorage.removeItem('token');
            navigate('/Login')
        }else{
          navigate('/Login')
        }
    }

  return (
    <header className="text-gray-600 body-font shadow-lg">
  <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
    <Link to={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
     <img className='w-24 aspect-auto mix-blend-multiply' src='./Logo.png' alt='Book Store' />
    </Link>
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">

      <Link to={'/'} className="mr-5 hover:text-gray-900">Home</Link>
   
    </nav>
      <Link to={'/Cart'} className="mr-5 hover:text-gray-900">Cart</Link>
    <button onClick={handleLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Logout
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</header>
  )
}

export default Navbar