require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5001;

const routes = require('./routes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(routes);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data  = error.data;
  return res.status(status).json({ msg: message, data: data});
});



mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true
  })
  .then(results => {
    app.listen(PORT, () => console.log('Server is running on port:', PORT));
    // console.log(results);
  })
  .catch(err => {
    console.log(err);
  });