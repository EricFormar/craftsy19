const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../data");

module.exports = {
  list: (req, res) => {
    const products = readJSON('products.json');

    return res.render("admin/adminProducts", {
      products,
    });
  },
  detail: (req, res) => {
    const products = readJSON('products.json');

    const product = products.find((product) => product.id === +req.params.id);

    return res.render("productDetail", {
      product,
    });
  },
  search: (req, res) => {
    return res.send(req.query)
  },
  add: (req, res) => {

    return res.render("productAdd",{
      categories : readJSON('categories.json'),
      brands : readJSON('brands.json')
    });
  },
  store: (req, res) => {

      const errors = validationResult(req);

      if(errors.isEmpty()){
        const products = readJSON('products.json');
        const { name, price, category, description, discount, brand } = req.body;      
  
        const newProduct = {
          id: products.length ? products[products.length - 1].id + 1 : 1,
          name: name.trim(),
          price: +price,
          discount : +discount,
          category,
          brand,
          description : description.trim(),
          image : req.file ? req.file.filename : null,
        };
  
        products.push(newProduct);
  
        writeJSON('products.json', products)
  
        return res.redirect("/");

      }else{
         return res.render('productAdd',{
          categories : readJSON('categories.json'),
          brands : readJSON('brands.json'),
          errors : errors.mapped(),
          old : req.body
         })
      }

      
   
  },
  edit: (req, res) => {
    const products = readJSON('products.json');

    const product = products.find((product) => product.id === +req.params.id);

    return res.render("productEdit", {
      product,
    });
  },
  update: (req, res) => {
      const { name, price, category, description, discount, brand } = req.body;      
      const products = readJSON('products.json');

      const productsModify = products.map((product) => {
        if (product.id === +req.params.id) {

          let productModify = {
            ...product,
            name : name.trim(),
            price: +price,
            category,
            brand,
            description : description.trim(),
            image : req.file ? req.file.filename : product.image,
          };
        
          return productModify;
        }
        return product;
      });

     writeJSON('products.json', productsModify)

      return res.redirect("/");

  },

  remove: (req, res) => {

    const productFilter = products.filter((product) => product.id !== +req.params.id);

    writeJSON('products.json', productFilter)


    return res.redirect("/");
  },

};
