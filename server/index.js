const express = require('express');
const cors = require('cors');
const routes = require('./router');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8888;

app.use(cors({
  origin: 'https://petvia-front.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});