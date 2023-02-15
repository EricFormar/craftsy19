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
      categories : readJSON('categories.json')
    });
  },
  store: (req, res) => {

      const products = readJSON('products.json');
      const { name, price, category, description, discount } = req.body;      

      const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: name.trim(),
        price: +price,
        discount,
        category,
        description : name.trim(),
        image : req.file ? req.file.filename : null,
      };

      products.push(newProduct);

      writeJSON('products.json', products)

      return res.redirect("/products");
   
  },
  edit: (req, res) => {
    const products = readJSON('products.json');

    const product = products.find((product) => product.id === +req.params.id);

    return res.render("productEdit", {
      product,
    });
  },
  update: (req, res) => {
      const { name, price, category, description, discount } = req.body;      
      const products = readJSON('products.json');

      const productsModify = products.map((product) => {
        if (product.id === +req.params.id) {

          let productModify = {
            ...product,
            name,
            price: +price,
            category: +category,
            images : req.files && req.files.images ? req.files.images.map(file => file.filename) : product.images,
            mainImage : req.files && req.files.mainImage ? req.files.mainImage[0].filename : product.mainImage,
          };
        
          return productModify;
        }
        return product;
      });

     writeJSON('products.json', productsModify)

      return res.redirect("/products");

  },

  remove: (req, res) => {

    const productFilter = products.filter((product) => product.id !== +req.params.id);

    writeJSON('products.json', productFilter)


    return res.redirect("/products");
  },

};
