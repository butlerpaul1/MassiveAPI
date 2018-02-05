const express = require('express');
const router = express.Router();



//get users/email,details,by id
 router.get('/users/:id', (req, res) => {
   req.app.get('db').users.find({"id =": 2}, {
  fields: ['email', 'details']
}).then(items => {
     res.json(items);
   });
 });


 //get user users by created_at
  router.get('/users', (req, res) => {
    req.app.get('db').users.find({},{
    order: [{field: 'created_at', direction: 'desc'}], fields: ['email', 'details']
  }).then(items => {
      res.json(items);
    });
  });

  //get product by price
   router.get('/products', (req, res) => {
     req.app.get('db').products.find({
     },{order: [{field: 'price'}]}
   ).then(items => {
       res.json(items);
     });
    });

     //get product by id
      router.get('/products/:id', (req, res) => {
        req.app.get('db').products.find({ 'id =': 4
        }).then(items => {
          res.json(items);
        });
      });


      //get purchases
       router.get('/purchases', (req, res) =>
       {
         req.app.get('db').query(
           'SELECT purchases.name, purchases.address, users.email, purchase_items.price, purchase_items.quantity, purchase_items.state FROM purchases, users, purchase_items WHERE purchases.user_id = users.id AND purchases.id = purchase_items.purchase_id'
          ).then(items => {
           res.json(items);
         });
       });


       //get search term
        router.get('/handleSubmit', (req, res) =>
        {
          var search ="'Drama'";
          req.app.get('db').query(
            'Select * from products where products.title =' + search + ";"
          ).then(items => {
            res.json(items);
          });
        });

        //parameterisedQuery
         router.get('/parameterisedQuery', (req, res) =>
         {
           var search ="Drama";
           var sqlQuery = "SELECT * FROM products where products.title = $1"
           req.app.get('db').query(sqlQuery,search).then(items => {
             res.json(items);
           });
         });

         //SQL injection
          router.get('/sqlInjection', (req, res) =>
          {
            var search ="Drama; SELECT * FROM products;";
            var sqlQuery = "SELECT * FROM products where products.title = $1"
            req.app.get('db').query(sqlQuery,search).then(items => {
              res.json(items);
            });
          });






  module.exports = router;
