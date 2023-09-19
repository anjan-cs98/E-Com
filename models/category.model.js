const mongoose=require('mongoose');

const categoryschema=mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    icon:{
       type:String
    },
    color:{
       type:String,
       required:true
    }
 },{versionKey:false});

/*---Creating a vertual ID using _id in mongoose---*/
/*---Duplicate the ID field---*/
categoryschema.virtual('id').get(function(){
   return this._id.toHexString();
});

/*Ensure virtual fields are serialised.*/
categoryschema.set('toJSON', {
   virtuals: true
});

const categoryModel=mongoose.model('Category',categoryschema,'categories');
module.exports=categoryModel;
console.log('Category Model is ready to use....');