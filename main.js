// Loading Express :
const express=require('express');
//Loading mongoose :
const mongoose=require('mongoose');
/*Loading morgan */
const morgan = require('morgan');
// Define a Port :
const port=3000;

/* Now env file load */
require('dotenv/config')
const api=process.env.API_URL;

/*Consume All Route*/
const category=require('./route/category.route');
const product=require('./route/product.route');
const user=require('./route/user.route');
const order=require('./route/order.route');

//Create a instance of a express :
const app=express();

/*Let express to accept incoming post data*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*Moddleware*/
app.use(morgan('tiny'));



/*Create a DataBase connection :*/
mongoose.connect(process.env.CONNECTION_STRING)
        .then(()=>{
             console.log('Mongodb Data Base Connected'); 
        })
        .catch((error)=>{
            console.log(error);  
        });

/*ALl END_PONTS */
app.use(`${api}`,category);
app.use(`${api}`,product);
app.use(`${api}`,user);
app.use(`${api}`,order);


/* Implement Auth JWT */

/*Create a Basic landing page :*/
app.get('/',(req,res)=>{
       res.send(`<h2 align="center" style="background-color:gold"> Welcome to EShop-2023 </h2>`);
});


/*Now Bind this port no :*/
app.listen(port,()=>{
       console.log(`Server has Started at : http://localhost:${port}`);
})