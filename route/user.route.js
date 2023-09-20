/* Load Express*/
const express = require('express');
/* Make a router service of a Express*/
const Router = express.Router();
/*Load mongoose*/
const mongoose = require('mongoose');
/*Loading bcryptjs*/
const bcryptjs = require('bcryptjs');
/*Load jsonwebtoken*/
const jwt = require('jsonwebtoken');
/* Consume the UserModel*/
const userModel = require('../models/user.model');

/*Now get all user details*/
Router.get('/users', async (req, res) => {
       const userDetails = await userModel.find({}).select('-passwordHash');
       if (!userDetails) {
              return res.status(400).json({ message: 'users not found', success: false })
       }
       res.status(200).json(userDetails);
});

/* Admin  registration */
Router.post('/users', async (req, res) => {
       const newUser = new userModel({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              passwordHash: bcryptjs.hashSync(req.body.password, 10),
              isAdmin: req.body.isAdmin,
              street: req.body.street,
              apartment: req.body.apartment,
              state :req.body.state,
              city:req.body.city,
              pincode:req.body.pincode,
              country:req.body.country
       });
       await newUser.save().then(users => {
              console.log(users);
              if (users) {
                    // res.status(200).json(users);
                     return res.status(400).json({ success:true, message: `Successfully register as a Admin` });
              } else {
                     return res.status(400).json({ success: false, message: `Admin can't be created....` });     
              }      
            }).catch(error => {
              res.status(200).json(error); 
       });
});

/*Geeting Statictic For Admin pannel*/
Router.get('/users/get/count', async (req, res) => {
       let Users = await userModel.countDocuments().then((resp) => { return resp });
       if (!Users) {
              return res.status(400).json({ success: false, message: 'count user not found...!' })
       }
       res.status(200).json({ 'countUsers': Users });
});


/*Delete product*/
Router.delete('/users/:id', async (req, res) => {
       if (!mongoose.isValidObjectId(req.params.id)) {
              return res.status(400).send('Users with the given ID not valid')
       }
     await  userModel.findOneAndDelete({ '_id': req.params.id })
              .then(info => {
                     if (info) {
                            res.status(200).json({ success: true, message: 'User was deleted..' })
                     } else {
                            res.status(404).json({ success: false, message: 'User was not deleted...!' })
                     }
              })
              .catch(err => {
                     res.status(404).json({ success: false, error: err });
              });

});

/* Geeting particular category by ID */
Router.get('/users/:id', async (req, res) => {
       let user = await userModel.findOne({ '_id': req.params.id }).select('-passwordHash');
       //console.log(user);
       if (!user) {
              return res.status(200).json({ success: false, message: 'user with the given ID was not found...!' })
       } else {
              res.status(200).json(user);
       }
});



/*Adding New Users */
Router.post('/users/register', async (req, res) => {
       const newUser = new userModel({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              passwordHash: bcryptjs.hashSync(req.body.password, 10),
              isAdmin:false,
              street: req.body.street,
              apartment: req.body.apartment,
              state :req.body.state,
              city:req.body.city,
              pincode:req.body.pincode,
              country:req.body.country
       });
       await newUser.save().then(users => {
              //console.log(users);
              if (users) {
                    // res.status(200).json(users);
                     return res.status(400).json({ success:true, message: `Successfully register as a Admin` });
              } else {
                     return res.status(400).json({ success: false, message: `Admin can't be created....` });     
              }      
            }).catch(error => {
              res.status(200).json(error); 
       });
      
});

/* user Login*/
Router.post('/users/login', async (req, res) => {
       // await Adventure.findOne({ country: 'Croatia' }).exec();  
       const user = await userModel.find({ 'email': req.body.email })
       //console.log(user);
       if (!user.length) {
              return res.status(400).json({ message: 'user not found..!', success: false });
       }
       if (user) {
              user.forEach((item) => {
                     let dbPass = item.passwordHash;
                     // console.log(dbPass);
                     let auth = bcryptjs.compareSync(req.body.password, dbPass);
                     // console.log(auth);
                     if (auth) {
                            const secret = process.env.mySecretKey;
                            const jwtToken = jwt.sign({ userId: item._id, isAdmin: item.isAdmin }, secret, { expiresIn: '1h' });
                            res.status(200).json({ message: 'User Authenticated', activeUser: item.name, user: item.email, token: jwtToken })
                     } else {
                            res.status(400).json({ message: 'Password was  wrong' })
                     }
              });
              //return res.status(200).json(user);
       }
});




module.exports =Router;
console.log('User router service is ready to use');