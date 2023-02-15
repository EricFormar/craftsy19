const express = require('express');
const { list, detail, add, store, edit, update, remove, search } = require('../controllers/productsController');
const { uploadImageProduct } = require('../middlewares/upload');
const productAddValidator = require('../validations/productAddValidator');
const router = express.Router();

/* /products */

router
    .get('/', list)
    .get('/detail/:id', detail)
    .get('/add',add)
    .post('/add', uploadImageProduct.single('image'), productAddValidator, store)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .delete('/delete/:id',remove)
    .get('/search',search)



module.exports = router;
