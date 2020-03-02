var express = require('express');
var router = express.Router();
var Product = require('../db/models/Product');
var authenticateWithJwt = require('../middlewares/jwt');
var {getSocket} = require('../socket');
const defaultData = require('../public/data/products.json')

/* GET products. */
router.get('/', function(req, res, next) {
  Product.find((err, products) => {
    if(err) return next(err);
    res.send(products).status(200)
  });
});

router.post('/', authenticateWithJwt, function(req, res, next) {
  const {name, price, type, rating, warranty_years, available} = req.body;
  const product = new Product({name, price, type, rating, warranty_years, available});
  
  product.save((err, p) => {
    if(err) return next(err);
    
    const socket = getSocket();
    socket.emit('products/add', p);

    res.send(p).status(200)
  });
});

router.put('/:id', authenticateWithJwt, function(req, res, next) {
  const _id = req.params.id;
  
  Product.findById(_id, (err, product) => {
    if(err) return next(err);
    const {name, price, type, rating, warranty_years, available} = req.body;
    product.name = name;
    product.price = price;
    product.type = type;
    product.rating = rating;
    product.warranty_years = warranty_years;
    product.available = available;
    product.save((err, p) => {
      if(err) return next(err);
      
      const socket = getSocket();
      socket.emit('products/edit', p);
  
      res.send(p).status(200)
    });
  });
})

router.delete('/:id', authenticateWithJwt, function(req, res, next) {
  const _id = req.params.id;
  Product.findByIdAndDelete(_id, (err, p) => {
    if(err) return next(err);
      
    const socket = getSocket();
    socket.emit('products/delete', {_id});

    res.send(p).status(200)
  });
});

router.post('/default', authenticateWithJwt, function(req, res, next) {
  Product.insertMany(defaultData, (err, data) => {
    if(err) return next(err);
      
    const socket = getSocket();
    socket.emit('products/set', data);

    res.send(data).status(200)
  });
});

module.exports = router;
