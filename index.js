const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const logger = require('morgan');
const dbConnect=require('./config/dbConfig')

const userRoute=require('./routes/userRoute')

app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'));
app.use('/',userRoute);


dbConnect()

app.listen(process.env.PORT, ()=>{
    console.log('server connected')
});