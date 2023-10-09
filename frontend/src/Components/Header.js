import React from 'react';
import { Link } from 'react-router-dom';
import { IoBookOutline } from 'react-icons/io5'
const Header = () => {

    return (
        <header className="bg-white shadow-lg fixed w-full z-[60] top-0">
            <div className="container mx-auto flex items-center justify-between p-2">
                <Link to="/" className="text-gray-900 font-medium text-lg flex items-center justify-center">
                    <IoBookOutline size={28} /> <span className='mx-2 font-semibold '>Book Store</span>
                </Link>

                <div className='border border-gray-400 rounded-full'>
                <Link className='mx-6 font-bold' to="/login">Login</Link>
                <span className='border-r border-gray-400'></span>
                <Link className='mx-6 font-bold' to="/signup">SignUp</Link>
                </div>

            </div>
        </header>
    );
};

export default Header;
