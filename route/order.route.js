/* Load Express*/
const express = require('express');
/* Make a router service of a Express*/
const Router = express.Router();
/*Consume Models*/
const OrderModel = require('../models/order.model');
const OrderItemModel = require('../models/order.model');

/*Now get all Order details*/
Router.get('/', async (req, res) => {
       const OrderDetails = await OrderModel.find({}).populate('user').sort({'dateOrdered':-1});
       if (!OrderDetails) {
            return  res.status(400).json({ message: 'Orders not found', success: false })
       }
       res.status(200).json(OrderDetails);
});


/* Geeting particular order by ID */
Router.get('/:id', async (req, res) => {
       let Order= await OrderModel.findOne({ '_id': req.params.id })
                                  .populate('user','name')
                                  .populate({path:'orderItems',populate:{path:'product',populate:'category'}});
      //console.log(Order);
       if (!Order) {
              return res.status(200).json({ success: false, message: 'Order with the given ID was not found...!' })
       } else {
              res.status(200).json(Order);
       }

});


/*Geeting Statictic For Admin pannel*/
Router.get('/get/count', async (req, res) => {
       let OrderCount = await OrderModel.countDocuments().then((resp) => { return resp });
       if (!OrderCount) {
              return res.status(400).json({ success: false, message: 'count orders not found...!' })
       }
       res.status(200).json({ 'countOrders':OrderCount });
});

/*Get Total Seles  */
Router.get('/get/totalSales',async(req,res)=>{
       const totalSales=await OrderModel.aggregate([
              {$group:{'_id':null,totalSale:{$sum:'$totalPrice'}}}
       ])
      // console.log(totalSales);
       if(!totalSales){
              return res.status(400).send('The order sales cannot be generated');
       }
      // res.status(200).json(totalSales);
       totalSales.forEach((item)=>{
        console.log(item);      
        res.status(200).json({'totalSales':item.totalSale});      
       })
     
});


/*Adding New Order */
Router.post('/', async (req, res) => {

     /*Sample 
       {
              "orderItems":[
                   { 
                     "quantity":2,
                     "product":"64b50b0035bd739f39b1e0e5"
                   },
                  { 
                     "quantity":2,
                     "product":"64af0501b1306bc9fa4dbd80"
                   }
                   
                 ],
                "shippingAddress":"Moura",
                "status":"Pending",
                "user":"64b4f30b5ae314b103a532e7"
              
              }
   */
       const OrderItemsIds= Promise.all(req.body.orderItems.map(async OrderItem=>{
              let newOrderItem=new OrderItemModel({
                     quantity:OrderItem.quantity,
                     product:OrderItem.product
              })
              newOrderItem=await newOrderItem.save();
              //console.log(newOrderItem);
              return newOrderItem._id;
       }))
      
      const OrderItemsIdsResolved=await OrderItemsIds
      //console.log(OrderItemsIdsResolved);

      //Calculate Total Price of the Product :
      const totalPrices= await Promise.all(OrderItemsIdsResolved.map(async (orderItemIds)=>{
         const OrderItem=await OrderItemModel.findById(orderItemIds).populate('product','price');
         //console.log(OrderItem);
         const totalPrice=OrderItem.product.price*OrderItem.quantity;
         return totalPrice;
      }));
      //console.log(totalPrices);
      const totalPrice=totalPrices.reduce((a,b)=>a+b,0);
      //console.log(totalPrice);

       const newOrder = new OrderModel({
              orderItems:OrderItemsIdsResolved,
              shippingAddress:req.body.shippingAddress,
              status:req.body.status,
              totalPrice:totalPrice,
              user:req.body.user
       });
      let  Order= await newOrder.save();
       if (!Order) {
           return  res.status(400).json({ success: false, message: `Order can't be created....` });
       }
       // res.status(200).json(categories);
       res.status(200).json({ success: true, message: 'Order successfully created...' })
});

/*Delete Order*/
Router.delete('/:id', (req, res) => {
       // OrderModel.findOneAndDelete({ '_id': req.params.id })
       //        .then(info => {
       //               if (info) {
       //                      res.status(200).json({ success: true, message: 'Order was deleted..' })
       //               } else {
       //                      res.status(404).json({ success: false, message: 'Order was not deleted...!' })
       //               }
       //        })
       //        .catch(err => {
       //               res.status(404).json({ success: false, error: err });
       //        })
       OrderModel.findByIdAndRemove({ '_id': req.params.id }).then(async order => {
              // console.log(order);
              if (order) {
                     // Here we delete OrderItems from orderItem table :
                     await order.orderItems.map(async Item => {
                            await OrderItemModel.findByIdAndRemove(Item);
                     })
                     return res.status(200).json({ success: true, message: 'Order was deleted..' })
              } else {
                     return res.status(404).json({ success: false, message: 'Order was not deleted...!' })
              }
       }).catch((error) => {
              res.status(400).json(error);
       });

});

/*Order Status Update*/
Router.all('/:id', async (req, res) => {
       if (req.method == 'PUT' || req.method == 'PATCH') {
              const Order = await OrderModel.updateOne({
                     '_id': req.params.id
              }, {
                     $set: {
                            'status': req.body.status
                            
                     }
              })
              // res.status(200).json(category);
              if (Order.modifiedCount && Order.matchedCount) {
                     res.status(200).json({ success: true, message: `Order successfully updated.... ` });

              } else {
                     res.status(400).json({ success: false, message: `Order can't be updated...!` })
              }
       } else {
              res.status(404).json({ message: `${req.method} method does't supports..!` });
       }
});




module.exports =Router;
console.log('Order router service is ready to use');