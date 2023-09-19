/* Load the Mongoose*/
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
       name: {
              type: String,
              required: true
       },
       email:{
              type:String,
              required: true,
              unique:true
       },
       phone:{
              type:Number,
              required: true,
              unique: true,
              minlength:10,
              maxlength:10
             
       
       },
       passwordHash:{
              type:String,
              required:true
       },
       isAdmin:{
              type:Boolean,
              default:false
       },
       street:{
              type:String,
              required:true
       },
       apartment:{
              type:String,
              required:true
       },
       state:{
              type:String,
              required:true
       },
       city:{
              type:String,
              required:true
       },
       pincode:{
              type:String,
              required:true
       },
       country:{
              type:String,
              required:true
       }
},{versionKey:false});

/*Creating a vertual ID using _id in mongoose*/
/*Duplicate the ID field.*/
userSchema.virtual('id').get(function(){
       return this._id.toHexString();
   });
   
   /*Ensure virtual fields are serialised.*/
userSchema.set('toJSON', {
       virtuals: true
   });

const userModel=mongoose.model('User',userSchema,'users');
module.exports=userModel;
console.log('User model is ready to use');