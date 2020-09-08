const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//-------Middlewares

//setting up view engine (when we are not using REACT as our view)
app.set('view engine', 'ejs');
//specify views folders name
app.set('views', 'views');

//parse the request body into readable data
app.use(bodyParser.urlencoded({extended:false}));
//specify the public folder to be of static access
app.use(express.static(path.join(__dirname,'public')));

//set the routes for admin
// app.use('/admin', );
//set the routes for shop
//app.use();

//-------end of Middlewares

//set up the port 
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server started at port ${PORT}.`))