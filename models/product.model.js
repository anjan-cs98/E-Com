const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   description:{
       type:String,
       required:true
   },
   richDescription:{
       type:String,
       default:''
    },
   brand: {
        type: String,
        required:true
   },
   image:{
       type:String,
       default:''
   },
   images:[
   ],
   price:{
       type:Number,
       default:0
   },
   category:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Category',
       required:true
   },
   countInStock:{
       type:Number,
       required:true,
       min:0,
       max:255
   },
   rating:{
       type:Number,
       default:0
   },
   numReviews:{
       type:Number,
       default:0
   },
   isFeatured:{
       type:Boolean,
       default:false
   },
   dateCreated:{
       type:Date,
       default:Date.now
   }
},{versionKey:false});

/*Creating a vertual ID using _id in mongoose*/
/*Duplicate the ID field.*/
productSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

/*Ensure virtual fields are serialised.*/
productSchema.set('toJSON', {
    virtuals: true
});

const ProductModel=mongoose.model('Product',productSchema,'products');
module.exports=ProductModel;
console.log('Product Model is ready to use');