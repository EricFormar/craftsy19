const express = require('express');
const { list, detail, add, store, edit, update, remove, search } = require('../controllers/productsController');
const router = express.Router();

/* /products */

router
    .get('/', list)
    .get('/detail/:id', detail)
    .get('/add',add)
    .post('/add',store)
    .get('/edit/:id',edit)
    .put('/update/:id',update)
    .delete('/delete/:id',remove)
    .get('/search',search)



module.exports = router;
