const express = require('express');
require('dotenv').config();
const connectDB = require('./Middleware/DB')
const port = process.env.PORT || 6000;
const BookDetails = require('./Routes/BooksApi');
const authenticate = require('./Routes/AuthApi')
const cors = require('cors')
const cartItems = require('./Routes/CartRoutes')

const app = express();

connectDB();

app.use(cors({
    origin: "https://book-management-phi.vercel.app",
    methods: ["GET", "POST", "PUT" , "DELETE"],
    credentials: true,
}));
app.use(express.json());

app.get('/' ,(req,res)=>{
    res.json("Books Api")
})

app.use('/api/booksList', BookDetails )
app.use('/api/auth', authenticate)
app.use('/api/cart', cartItems)


app.listen(port,()=>{
    console.log(`Server has started on port ${port} `)
})


