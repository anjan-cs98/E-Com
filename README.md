# E-Com
Complete E-com website 
E - COM PROJECT BACK - END API END - POINTS [ Node.Js + Express +MongoDB ]

 User :
1.  Create a  Admin:
URL : http://localhost:3000/api/v1/users
Method:POST
Params:
              name
              email
              phone
              password
              isAdmin
              street
              apartment
              state
              city
              pincode
              country

2.User Registration :
   URL : http://localhost:3000/api/v1/users/register
   Method:POST
   Params:
              name
              email
              phone
              password
              street
              apartment
              state
              city
              pincode
              country

3.Login Both User/ Admin :
 URL : http://localhost:3000/api/v1/users/login
 Method : POST
 Params : email,password 


4.Get all User :
  URL: http://localhost:3000/api/v1/users
  Method: GET
  Params :None
5.Get User Count Only for Admin :
 URL: http://localhost:3000/api/v1/users/get/count
 Method:GET
 Params :None

6.Get particular user depends on Id :
URL: http://localhost:3000/api/v1/users/id
Method:GET
Params:None

7.Delete particular user depends on Id :
URL : http://localhost:3000/api/v1/users/id
Method:DELETE
Params :None



Category:
1.Get All category:
URL : http://localhost:3000/api/v1/categories
Method :GET
Params :None

2.Geeting Particular category depends on ID:
URL : http://localhost:3000/api/v1/category/id
Method : GET
Params :None

3.Add New Category: 
URL : http://localhost:3000/api/v1/category
Method: POST
Params : name,icon,color [all are string]

4.Update Partcular Category:
URL : http://localhost:3000/api/v1/category/id
Method: PUT/PATCH
Params :name,icon,color [all are string ]

5. Delete Particular Category:
URL: http://localhost:3000/api/v1/category/id
Method:DELETE
Params : None



Product:

1.Get All Products :
URL : http://localhost:3000/api/v1/products
Method: GET
Params: None

2.Geeting particular product:
URL: http://localhost:3000/api/v1/product/id
Method:GET
Params:None

3.Get all Product depends on Query Params:
URL: http://localhost:3000/api/v1/products?catagories=id
Method:GET
Params : category id [id,id]

4.Adding new product:
URL : http://localhost:3000/api/v1/product
Method :POST
Params: 
name
description
richDescription
image
images [optional]
price
category [category id]
countInStock
rating
numReviews
isFeatured

5.Update Particular Product depends on id: 
URL: http://localhost:3000/api/v1/product/id
Method:PUT/PATCH
Params:
name
description
richDescription
image
images [optional]
price
category [category id]
countInStock
rating
numReviews
isFeatured

6. Delete particular product depends on id:
URL: http://localhost:3000/api/v1/product/id
Method:DELETE
Params:None

7.Get Count numbers of product :
URL : http://localhost:3000/api/v1/products/get/count
Method:GET
Params:None


8.Geeting featured product and set limit:
URL: http://localhost:3000/api/v1/products/get/featured/3
Method:GET
Params:None

9.Update Product Gallery depends on Id:
URL: http://localhost:3000/api/v1/product/gallery/id
Method:PUT/PATCH
Params:images [Add multiple photos]

Order :
  
 1.Getting All Order :
 URL : http://localhost:3000/api/v1/order
 Method:GET
 Params :None

2.Geeting Oder Details depends on Id:
 URL : http://localhost:3000/api/v1/order/id
 Method:GET
 Params:None

3.Get Order count:
  URL: http://localhost:3000/api/v1/order/get/count
  Method :GET
  Params :None

4.Geeting particular user Order details: 
 URL: http://localhost:3000/api/v1/order/get/userorders/userId
 Method :GET
 Params :None

5.Get Total Sales: 
  URL: http://localhost:3000/api/v1/order/get/totalSales
  Method:GET
  Params:None

6.Add New Order:
   URL: http://localhost:3000/api/v1/order
   Method:POST
   Params:

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
                "shippingAddress1":"Moura",
                "shippingAddress2":"Nayagram",
                "city":"Midnapore",
                "pincode":"721102",
                "country":"India",
                "phone":8016025019,
                "status":"Pending",
                "user":"64b4f30b5ae314b103a532e7"
              
              }
   */

7.Order Status update:
   URL : http://localhost:3000/api/v1/order/orderId
   Method:PUT/PATCH
   Params : status  [string]


8.Delete particular order depends on orderId:
  URL: http://localhost:3000/api/v1/order/orderId
  Method:DELETE
  Params:None










  


