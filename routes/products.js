const express = require('express');
const { list, detail, add, store, edit, update, remove, search } = require('../controllers/productsController');
const { uploadImageProduct } = require('../middlewares/upload');
const productValidator = require('../validations/productValidator');
const router = express.Router();

/* /products */

router
    .get('/list', list)
    .get('/detail/:id', detail)
    .get('/add',add)
    .post('/add', uploadImageProduct.single('image'), productValidator, store)
    .get('/edit/:id',edit)
    .put('/update/:id', uploadImageProduct.single('image'),productValidator,update)
    .delete('/delete/:id',remove)
    .get('/search',search)



module.exports = router;
