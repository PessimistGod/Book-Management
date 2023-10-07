const express = require('express');
require('dotenv').config();
const connectDB = require('./Middleware/DB')
const port = process.env.PORT || 6000;
const BookDetails = require('./Routes/BooksApi');
const authenticate = require('./Routes/AuthApi')
const cors = require('cors')
const bodyParser = require('body-parser');
const cartItems = require('./Routes/CartRoutes')

const app = express();

connectDB();
app.use(express.json());
app.use(bodyParser.json({ limit: '1gb' }));

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT" , "PATCH", "DELETE"],
    credentials: true,
}))

app.get('/' ,(req,res)=>{
    res.json("Books Api")
})

app.use('/api/booksList', BookDetails )
app.use('/api/auth', authenticate)
app.use('/api/cart', cartItems)


app.listen(port,()=>{
    console.log(`Server has started on port ${port} `)
})


