const express = require('express');
require('dotenv').config();
const connectDB = require('./Middleware/DB');
const port = process.env.PORT || 6000;
const BookDetails = require('./Routes/BooksApi');
const authenticate = require('./Routes/AuthApi');
const cors = require('cors');
const cartItems = require('./Routes/CartRoutes');

const app = express();

app.use(express.json());


const corsOptions = {
  origin: ["https://book-management-phi.vercel.app", "http://localhost:3000"],
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.get('/', (req, res) => {
  res.json("Books Api");
});

app.use('/api/booksList', BookDetails);
app.use('/api/auth', authenticate);
app.use('/api/cart', cartItems);

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
