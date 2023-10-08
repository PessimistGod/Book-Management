import React from 'react';
import {BiSearch} from 'react-icons/bi'

const SearchForm = ({ searchQuery, handleSearchInputChange }) => {
  return (
    <div className="flex justify-center items-center ">
      <form className="mb-4" onSubmit={(e) => e.preventDefault()}>
        <div className="relative w-96 flex"> {/* Adjust the width here, for example, 'w-96' for a wider search bar */}
          <input
            type="text"
            className="border p-2 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-400 transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 w-full"
            placeholder="Search by title, author, genre..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button
            type="submit"
            className="bg-gray-800 text-white px-4 py-2 mx-4 rounded-r-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 transition-transform duration-300 ease-in-out transform-gpu hover:scale-105 flex justify-center items-center"
          >
             <BiSearch size={18}/><span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
