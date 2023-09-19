const mongoose=require('mongoose');

const OrderItemSchema=mongoose.Schema({
        quantity:{
              type:Number,
              required:true
        },
        product:{
              type: mongoose.Schema.Types.ObjectId,
              ref:'Product'
        }
},{versionKey:false});

/*Creating a vertual ID using _id in mongoose*/
/*Duplicate the ID field.*/
OrderItemSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

/*Ensure virtual fields are serialised.*/
OrderItemSchema.set('toJSON', {
    virtuals: true
});

const OrderItemModel=mongoose.model('OrderItem',OrderItemSchema,'orderItem');
module.exports=OrderItemModel;
console.log('OrderItem Model is ready to use');