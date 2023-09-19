const mongoose=require('mongoose');

const OrderSchema=mongoose.Schema({
       orderItems:[{
              type:mongoose.Schema.Types.ObjectId,
              ref:'OrderItem',
              required:true
       }],
       shippingAddress1:{
              type:String,
              required:true
       },
       shippingAddress2:{
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
       },
       phone:{
              type:String,
              required:true
       },
       status:{
              type:String,
              required:true,
              default:'Pending'
       },
       totalPrice:{
              type:Number,
              required:true
       },
       user:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'User'
       },
       dateOrdered:{
              type:Date,
              default:Date.now
       }
},{versionKey:false});

/*Creating a virtual ID using _id in mongoose*/
/*Duplicate the ID field.*/
OrderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

/*Ensure virtual fields are serialised.*/
OrderSchema.set('toJSON', {
    virtuals: true
});

const OrderModel=mongoose.model('Order',OrderSchema,'order');
module.exports=OrderModel;
console.log('Order Model is ready to use');