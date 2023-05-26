import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const Update = () => {
  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    description: '',
    cover: '',
    price: null,
  });

  const { title, description, cover, price } = book;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const getBookbyId = async (id) => {
    try {
      await axios.get(`http://localhost:8800/books/` + id).then((res) => {
        console.log(res.data);
        setBook(res.data[0]);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/` + id, book).then((res) => {
        console.log('Book Updated');
        console.log(res.data);
        if (res.data === 'Book Updated Successfully') {
          navigate('/');
        }
      });
    } catch (err) {
      console.log(err);
    }
    console.log(book);
  };

  useEffect(() => {
    getBookbyId(id);
  }, []);
  return (
    <div>
      <h1>Update the Book</h1>
      <div className='card p-3'>
        <form onSubmit={handleSubmit} className='formdiv'>
          <input
            type='text'
            name='title'
            value={title}
            placeholder='Title'
            onChange={handleChange}
          />
          <input
            type='text'
            name='description'
            value={description}
            placeholder='Description'
            onChange={handleChange}
          />
          <input
            type='text'
            name='cover'
            value={cover}
            placeholder='cover'
            onChange={handleChange}
          />
          <input
            type='number'
            name='price'
            placeholder='price'
            value={price}
            onChange={handleChange}
          />
          <button type='submit' className='btn btn-success'>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
