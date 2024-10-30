const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json()); // Cho body JSON
app.use(bodyParser.urlencoded({ extended: true }));



const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: 3306,
  password: "loc2003",
  database: "test_api",
});


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Dang ket noi voi database");
});


// API dang nhap
app.post('/login', express.json(), (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM user WHERE name = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }
      if (result.length > 0) {
          res.json({ message: 'Login successful', user: result[0] });
      } else {
          res.status(401).json({ message: 'Invalid username or password' });
      }
  });
});


// API dang ky
app.post('/signup',(req, res) => {
  const { username, password } = req.body; 

  // kiểm tra username có tồn tại hay chưa
  const query = 'SELECT * FROM user WHERE name = ?';
  db.query(query, [username], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Database error' });
      }
      
      if (result.length > 0) {
          return res.status(409).json({ error: 'Username already exists' });
      }

      // thêm user vào database
      const insertQuery = 'INSERT INTO user (name, password) VALUES (?, ?)';
      db.query(insertQuery, [username, password], (err, result) => {
          if (err) {
              return res.status(500).json({ error: 'Database error' });
          }
          res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
      });
  });
});
// app.post("/signup", (req, res) => {
//   const { name, password, avatar } = req.body;
//   var sql = "INSERT INTO user (name, password, avatar) VALUES (?, ?, ?)";
//   db.query(sql, [name, password, avatar], (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.send("Dang ky thanh cong");
//     }
//   });
// });



app.listen(3000, () => {
  console.log("Server dang chay tren port 3000");
});
