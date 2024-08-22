const express= require('express');
const app = express();
const cookieParser=require('cookie-parser')

require('dotenv').config();
// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

const routes=require('./routes/routes');
const dbConnection = require('./config/db');
app.use(routes);

dbConnection();

app.get('/',(req,res)=>{
    res.send('hello world');
})




