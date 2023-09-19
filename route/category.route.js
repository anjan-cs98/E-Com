//Loading express :
const express=require('express');
// Make a router service of a Express :
const Route=express.Router();
/*Consume Catergory Model*/
const categoryModel=require('../models/category.model');

/*Get all Categories */
Route.get('categories', async (req,res)=>{
       const Categories= await categoryModel.find({});
       if(!Categories){
         return  res.status(400).json({success:false,message:'Category Not Found...!'});     
       }
       res.status(200).json(Categories);
});


/*Get particular  Category Depends On ID */
Route.get('category/:id', async (req,res)=>{
       const Categories= await categoryModel.findOne({'_id':req.params.id});
       if(!Categories){
         return  res.status(400).json({success:false,message:'Category Not Found...!'});     
       }
       res.status(200).json(Categories);
});


/*Add new category*/
Route.post('category',async (req,res)=>{
       const newCategory = new categoryModel({
              name: req.body.name,
              icon: req.body.icon,
              color: req.body.color
              
       }); 
       const Category= await newCategory.save();
       if(!Category){
       return  res.status(400).json({success:false,message:'Category Not created...!'});          
       }
       res.status(200).json({success:true,message:'Category created successfully'})
});


/*Delete particular  Category Depends On ID */
Route.delete('category/:id', (req, res) => {
       categoryModel.findOneAndDelete({ '_id': req.params.id })
              .then(info => {
                     if (info) {
                            res.status(200).json({ success: true, message: 'category is deleted..' })
                     } else {
                            res.status(404).json({ success: false, message: 'category is not deleted...!' })
                     }
              })
              .catch(err => {
                     res.status(404).json({ success: false, error: err });
              })

});

/*Category Update*/
Route.all('category/:id', async (req, res) => {
       if (req.method == 'PUT' || req.method == 'PATCH') {
              const category = await categoryModel.updateOne({
                     '_id': req.params.id
              }, {
                     $set: {
                            'name': req.body.name,
                            'icon':req.body.icon,
                            'color': req.body.color

                     }
              })
              // res.status(200).json(category);
              if (category.modifiedCount && category.matchedCount) {
                     res.status(200).json({ success: true, message: `category successfully updated.... ` });

              } else {
                     res.status(400).json({ success: false, message: `category can't be updated...!` })
              }
       } else {
              res.status(404).json({ message: `${req.method} method does't supports..!` });
       }
});

// Now export categoryRoute:
module.exports=Route;
console.log('Category router service is ready to use');