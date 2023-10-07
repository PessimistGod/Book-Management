import React from 'react';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-2 border rounded-full ${currentPage === i ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
          >
            {i}
          </button>
        );
      } else if (
        buttons.length > 0 &&
        buttons[buttons.length - 1] !== '...' &&
        i === currentPage + 3
      ) {
        buttons.push(
          <button
            key={`ellipsis-${i}`}
            disabled
            className={`px-3 py-1 mx-2 border rounded-md bg-white text-gray-800`}
          >
            ...
          </button>
        );
      }
    }
    return buttons;
  };

  return (
    <div className="flex justify-center my-5">
      {renderPaginationButtons()}
    </div>
  );
};

export default Pagination;
