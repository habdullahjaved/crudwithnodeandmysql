import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Add = () => {
  const [book, setBook] = useState({
    title: '',
    description: '',
    cover: '',
    price: null,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8800/books', book).then((res) => {
        console.log('Book created');
        console.log(res.data);
        if (res.data === 'Book created Successfully') {
          navigate('/');
        }
      });
    } catch (err) {
      console.log(err);
    }
    console.log(book);
  };
  return (
    <div>
      <h1>Add Book</h1>
      <div className='card p-3'>
        <form onSubmit={handleSubmit} className='formdiv'>
          <input
            type='text'
            name='title'
            placeholder='Title'
            onChange={handleChange}
          />
          <input
            type='text'
            name='description'
            placeholder='Description'
            onChange={handleChange}
          />
          <input
            type='text'
            name='cover'
            placeholder='cover'
            onChange={handleChange}
          />
          <input
            type='number'
            name='price'
            placeholder='price'
            onChange={handleChange}
          />
          <button type='submit' className='btn btn-success'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
