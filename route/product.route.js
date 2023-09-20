/*Loading Express */
const express=require('express');
/*Make a router service of a Express*/
const Route = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');
/* Load Multer */
const multer = require('multer');
/*Consume Product Model*/
const productModel=require('../models/product.model');
const categoryModel = require('../models/category.model');

/* Image Upload  */
const storage = multer.diskStorage({
       destination: function (req, file, cb) {
              cb(null, 'public/uploads/')
       },
       filename: function (req, file, cb) {
              const uniqueSuffix = Date.now();
              const extension = '.jpg';
              cb(null, `${file.fieldname}${uniqueSuffix}${extension}`);
       }
});
     
const upload = multer({ storage: storage })

/*Get all Products */
Route.get('/products', async (req, res) => {
       let filter = {}
       if (req.query.categories) {
            filter={category:req.query.categories.split(',')}   
       }
       const Products= await productModel.find(filter).populate('category');
       if(!Products.length){
         return  res.status(400).json({success:false,message:'Products Not Found...!'});     
       }
       res.status(200).json(Products);
});


/*Get particular  Product Depends On ID */
Route.get('/product/:id', async (req, res) => {
       let Product = await productModel.findOne({ '_id': req.params.id }).populate('category');
       //console.log(Product);
       if (Product) {
              return res.status(200).json(Product);
       } else {
              return res.status(200).json({ success: false, message: 'Product with the given ID was not found...!' })   
       }

});


/*Geeting Statictic For Admin pannel*/
Route.get('/products/get/count', async (req, res) => {
       let Products = await productModel.countDocuments().then((resp) => { return resp });
       if (Products) {
             return res.status(200).json({ 'countProducts': Products });   
       }
       else
       return res.status(400).json({ success: false, message: 'count product not found...!' })       
      
});

/* geeting featured Product*/
Route.get('/products/get/featured/:count', async (req, res) => {
       const count = req.params.count ? req.params.count: 0;
       const Products = await productModel.find({ isFeatured: true }).limit(+count);
       if (Products) {
         return res.status(200).json(Products);        
       }
       else
       return  res.status(400).json({success:false,message:'Products Not Found...!'});         
      
});


/*Add new Products*/
Route.post('/product/',upload.single('image'),async (req, res) => {
       const category = await categoryModel.find({ '_id': req.body.category })
       //console.log(category);
       if (!category.length) { return res.status(400).json({ message: 'Invalid Category' }) }
       const file = req.file;
       if(!file){ return res.status(400).send('No file !')}
       const fileName = req.file.filename;
       const base_Url = `${req.protocol}://${req.get('host')}/public/uploads/`;
 
       const newProduct=new productModel({
              name:req.body.name,
              description:req.body.description,
              richDescription: req.body.richDescription,
              brand:req.body.brand,
              image:`${base_Url}${fileName}`,
              images:req.body.images,
              price:req.body.price,
              category:req.body.category,
              countInStock:req.body.countInStock,
              rating:req.body.rating,
              numReviews:req.body.numReviews,
              isFeatured:req.body.isFeatured
              

       });
       //console.log(newProduct);
       const Product= await newProduct.save();
       if(!Product){
       return  res.status(400).json({success:false,message:'Product Not created...!'});          
       }
       res.status(200).json({success:true,message:'Product created successfully'})
});


/*Delete particular  Products Depends On ID */
Route.delete('/product/:id', async (req, res) => {
       if (!mongoose.isValidObjectId(req.params.id)) {
              return res.status(400).send('Product with the given ID not valid')
       }
       const Product = await productModel.find({ _id: req.params.id });
       //console.log(Product);
       Product.forEach(img => {
              let oldimagePath = img.image.slice(37);
              //console.log(oldimagePath);
              // var String=oldimagePath.slice(37);
              fs.unlink('./public/uploads/' +oldimagePath, (err) => {
                     if (err) {
                      console.log(err)    
                     };
                     console.log('successfully deleted file');
                   });
          }); 
       await productModel.findOneAndDelete({ '_id': req.params.id })
              .then(info => {
                     if (info) {
                            res.status(200).json({ success: true, message: 'Product is deleted..' })
                     } else {
                            res.status(404).json({ success: false, message: 'Product is not deleted...!' })
                     }
              })
              .catch(err => {
                     res.status(404).json({ success: false, error: err });
              });

});

/* Product gallery update  */
Route.all('/product/gallery/:id',upload.array('images',5),async (req, res) => {
      
       if (req.method == 'PUT' || req.method == 'PATCH') {
              const base_Url = `${req.protocol}://${req.get('host')}/public/uploads/`;
              //console.log(req.files);
              const files = req.files;
              const imageURIs = [];
              files.map((file) => {
                     // const { path } = `${base_Url}${file.filename}`;
                     imageURIs.push(`${base_Url}${file.filename}`);
              });
              //console.log(imageURIs);
              const Product = await productModel.findByIdAndUpdate(
                     { '_id': req.params.id },
                     {
                            'images': imageURIs
                     }
               )
              if (Product) {
               return res.status(200).json({success:true,message:'Image gallery updated successfully....!'});     
              }
              else
              return res.status(200).json({success:false,message:'Image gallery not updated...!'});     
             
           } else {
              res.status(404).json({ message: `${req.method} method does't supports..!` });
         }
});


/*Product Update*/
Route.all('/product/:id',upload.single('image'),async (req, res) => {
      
       if (req.method == 'PUT' || req.method == 'PATCH') {
              const file = req.file;
              //console.log(file);
              if(!file){ return res.status(400).send('No file !')}
              const fileName = req.file.filename;
              const base_Url = `${req.protocol}://${req.get('host')}/public/uploads/`;
              
              const Product = await productModel.findByIdAndUpdate({
                     '_id': req.params.id
              }, {
                     'name': req.body.name,
                     'description': req.body.description,
                     'richDescription': req.body.richDescription,
                     'brand': req.body.brand,
                     'image': `${base_Url}${fileName}`,
                     'images': req.body.images,
                     'price': req.body.price,
                     'category': req.body.category,
                     'countInStock': req.body.countInStock,
                     'rating': req.body.rating,
                     'numReviews': req.body.numReviews,
                     'isFeatured': req.body.isFeatured
              });
              if (Product) {
              return res.status(200).json({ success: true, message: `product successfully updated.... ` });    
              }
              else
              return  res.status(400).json({ success: false, message: `product can't be updated...!` })    
             
       } else {
              res.status(404).json({ message: `${req.method} method does't supports..!` });
       }
});



// Now export ProductRoute:
module.exports=Route;
console.log('Product router service is ready to use');