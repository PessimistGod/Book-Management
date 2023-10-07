import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CreateBook.css';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    price: '',
    genre: '',
    description: '',
    language: '',
    publicationDate: '',
    imageUrl: '', 
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login');
    }
    async function fetchBookDetails() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/booksList/edit/${id}`);
        if (response) {
            setFormData(response.data);
        } else {
              navigate('/');
          }
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    }

    if(id){

        fetchBookDetails();
    }else{
        navigate('/')
    }
  }, [id, navigate]);

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
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/booksList/update/${id}`, formData);
      if (response.data) { 
        navigate('/');
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-book-container p-3">
      <h1 className="create-book-title">Edit Book Details</h1>
      <form className="create-book-form bg-gray-50 p-4 border border-rounded rounded-2xl" onSubmit={handleSubmit}>
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
        <label className="create-book-label" htmlFor="language">
          Language:
        </label>
        <input
          className="create-book-input"
          type="text"
          id="language"
          name="language"
          value={formData.language}
          onChange={handleChange}
        />

        <label className="create-book-label" htmlFor="publicationDate">
          Publication Date:
        </label>
        <input
          className="create-book-input"
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={formData.publicationDate}
          onChange={handleChange}
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


    </div>
  );
};

export default EditBook;
