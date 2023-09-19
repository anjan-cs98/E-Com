/*Loading Express */
const express=require('express');
// Make a router service of a Express :
const Route=express.Router();
/*Consume Product Model*/
const productModel=require('../models/product.model');

/*Get all Products */
Route.get('/', async (req,res)=>{
       const Products= await productModel.find({}).populate('category');
       if(!Products){
         return  res.status(400).json({success:false,message:'Products Not Found...!'});     
       }
       res.status(200).json(Products);
});


/*Get particular  Product Depends On ID */
Route.get('/:id', async (req,res)=>{
       const Products= await productModel.findOne({'_id':req.params.id}).populate('category');
       if(!Products){
         return  res.status(400).json({success:false,message:'Product Not Found...!'});     
       }
       res.status(200).json(Products);
});


/*Add new Products*/
Route.post('/',async (req,res)=>{
       const newProduct=new productModel({
              name:req.body.name,
              description:req.body.description,
              price:req.body.price,
              image:req.body.image,
              category:req.body.category
       });
       //console.log(newProduct);
       const Product= await newProduct.save();
       if(!Product){
       return  res.status(400).json({success:false,message:'Product Not created...!'});          
       }
       res.status(200).json({success:true,message:'Product created successfully'})
});


/*Delete particular  Products Depends On ID */
Route.delete('/:id', (req, res) => {
       productModel.findOneAndDelete({ '_id': req.params.id })
              .then(info => {
                     if (info) {
                            res.status(200).json({ success: true, message: 'Product is deleted..' })
                     } else {
                            res.status(404).json({ success: false, message: 'Product is not deleted...!' })
                     }
              })
              .catch(err => {
                     res.status(404).json({ success: false, error: err });
              })

});

/*Product Update*/
Route.all('/:id', async (req, res) => {
       if (req.method == 'PUT' || req.method == 'PATCH') {
              const Product = await productModel.updateOne({
                     '_id': req.params.id
              }, {
                     $set: {
                            'name':req.body.name,
                            'description':req.body.description,
                            'price':req.body.price,
                            'image':req.body.image,
                            'category':req.body.category   
                     }
              })
              // res.status(200).json(Product);
              if (Product.modifiedCount && Product.matchedCount) {
                     res.status(200).json({ success: true, message: `product successfully updated.... ` });

              } else {
                     res.status(400).json({ success: false, message: `product can't be updated...!` })
              }
       } else {
              res.status(404).json({ message: `${req.method} method does't supports..!` });
       }
});

// Now export ProductRoute:
module.exports=Route;
console.log('Product router service is ready to use');