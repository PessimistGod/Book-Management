import React, { useState } from 'react';
import axios from 'axios';
import './CreateBook.css';

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    price: '',
    genre: '',
    description: '',
    imageUrl: '', // Field for image URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/booksList/create`,
        formData
      );

      console.log('Response:', response.data);

      setFormData({
        title: '',
        authors: '',
        price: '',
        genre: '',
        description: '',
        imageUrl: '', // Reset the image URL field
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="create-book-container ">
      <h1 className="create-book-title">Add Book Details</h1>
      <form className="create-book-form" onSubmit={handleSubmit}>
        <label className="create-book-label" htmlFor="imageUrl">
          Image URL:
        </label>
        <input
          className="create-book-input"
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />

              {formData.imageUrl && (
                <div className='flex justify-end'>

        <img
          src={formData.imageUrl}
          alt="failed to Load"
          className="w-14 h-14 rounded-full "
          />
          </div>
      )}

        <label className="create-book-label" htmlFor="title">
          Title:
        </label>
        <input
          className="create-book-input"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label className="create-book-label" htmlFor="authors">
          Authors:
        </label>
        <input
          className="create-book-input"
          type="text"
          id="authors"
          name="authors"
          value={formData.authors}
          onChange={handleChange}
          required
        />

        <label className="create-book-label" htmlFor="price">
          Price:
        </label>
        <input
          className="create-book-input"
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label className="create-book-label" htmlFor="genre">
          Genre:
        </label>
        <input
          className="create-book-input"
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />

        <label className="create-book-label" htmlFor="description">
          Description:
        </label>
        <textarea
          className="create-book-input"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button className="create-book-button" type="submit">
          Submit
        </button>
      </form>

      {/* Display the image using the provided URL */}

    </div>
  );
};

export default CreateBook;
