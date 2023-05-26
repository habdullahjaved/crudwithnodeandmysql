import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'books',
});
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.json('Hello this is backend');
});
app.get('/books', (req, res) => {
  const q = 'SELECT * FROM `books`';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = 'SELECT * FROM `books` WHERE id=?';
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//
app.post('/books', (req, res) => {
  const q =
    'INSERT INTO books (`title`,`description`,`cover`,`price`) VALUES(?)';
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book created Successfully');
  });
});
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = 'DELETE FROM books WHERE id =?';
  db.query(q, [bookId], (err, data) => {
    if (err) res.json('Error Deleting Book');
    return res.json('Book Deleted Successfully');
  });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q =
    'UPDATE `books` SET `title`=? ,`description`=?,`cover`=?,`price`=? WHERE `id`=?';
  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json('Book Updated Successfully');
  });
});
app.listen(8800, () => {
  console.log('db connected');
});
