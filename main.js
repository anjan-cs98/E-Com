/*Loading Express :*/
const express=require('express');
/*Loading mongoose :*/
const mongoose=require('mongoose');
/*Loading morgan */
const morgan = require('morgan');
/*Define a Port :*/
const port = 3000;

/* Load cors  */
const cors = require('cors');

/* Now env file load */
require('dotenv/config')
const api = process.env.API_URL;

/* Load JWT auth */
const JwtAuth = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

/*Consume All Route*/
const category=require('./route/category.route');
const product=require('./route/product.route');
const user=require('./route/user.route');
const order=require('./route/order.route');

//Create a instance of a express :
const app = express();

/* Let server cors free  */
app.use(cors());
app.options('*', cors());

/*--Let express to accept incoming post data--*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* Make available server static resource */
app.use('/public/uploads', express.static(__dirname + '/public/uploads/'));

/*Moddleware*/
app.use(morgan('tiny'));
/* Implement Auth JWT */
app.use(JwtAuth());


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


/* For Prevent any Error  */
/* It define in the last of the applicaction after all api-end points  */
app.use(errorHandler);


/*Create a Basic landing page :*/
app.get('/',(req,res)=>{
       res.send(`<h2 align="center" style="background-color:gold"> Welcome to EShop-2023 </h2>`);
});


/*Now Bind this port no :*/
app.listen(port,()=>{
       console.log(`Server has Started at : http://localhost:${port}`);
})