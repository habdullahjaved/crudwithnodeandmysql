import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Books = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    await axios.get('http://localhost:8800/books').then((res) => {
      setBooks(res.data);
    });
  };
  useEffect(() => {
    getBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8800/books/' + id).then((res) => {
        console.log(res.data);
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(books);
  return (
    <div>
      <h1>Book Shop</h1>
      <div className='books'>
        {books?.map((book, index) => (
          <div className='book' key={index}>
            {book?.cover && <img src='' alt='' />}
            <h2>{book?.title}</h2>
            <p>{book?.description}</p>
            <span>{book?.price}</span>
            <button
              className='btn delete'
              onClick={() => handleDelete(book.id)}
            >
              Delete
            </button>
            <button className='btn update'>
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to={'/add'}>Add New Book</Link>
      </button>
    </div>
  );
};

export default Books;
