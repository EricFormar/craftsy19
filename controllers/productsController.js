const fs = require("fs");
const path = require("path");


module.exports = {
  add: (req, res) => {
    return res.render("productAdd", {
      categories,
    });
  },
  store: (req, res) => {
      let { name, price, category, state, origin } = req.body;
      let lastID = products[products.length - 1].id;
      let images = req.files.map((image) => image.filename);
      let newProduct = {
        id: +lastID + 1,
        name: name.trim(),
        price: +price,
        category: +category,
        img: images.length > 0 ? images : ["noimage.jpeg"],
        features: [origin, state],
        visible : visible ? true : false
      };

      products.push(newProduct);

      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "products.json"),
        JSON.stringify(products, null, 3),
        "utf-8"
      );

      return res.redirect("/");
   
  },
  edit: (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === +id);

    return res.render("productEdit", {
      categories,
      product,
    });
  },
  update: (req, res) => {
      const { id } = req.params;
      let { name, price, category, state, origin } = req.body;

      const productsModify = products.map((product) => {
        if (product.id === +id) {

          
          let productModify = {
            ...product,
            name,
            price: +price,
            category: +category,
            features: [origin, state],
            img: req.files.length > 0 ? images : product.img,
          };
          if (req.file.length > 0) {
     
          }
          return productModify;
        }
        return product;
      });

      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "products.json"),
        JSON.stringify(productsModify, null, 3),
        "utf-8"
      );

      return res.redirect("/");

  },
  detail: (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === +id);

    return res.render("productDetail", {
      product,
    });
  },
  cart: (req, res) => res.render("productCart"),
  getByCategory: (req, res) => {
    const { idCategory } = req.params;

    const { name } = categories.find((category) => category.id === +idCategory);

    return res.render("categories", {
      name,
      products: products.filter((product) => product.category === +idCategory),
    });
  },
  search: (req, res) => {
    const { keyword } = req.query;
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    let namesCategories = categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
      };
    });

    return res.render("result", {
      products: result,
      keyword,
      namesCategories,
    });
  },
  remove: (req, res) => {
    const { id } = req.params;

    const productFilter = products.filter((product) => product.id !== +id);

    fs.writeFileSync(
      path.resolve(__dirname, "..", "data", "products.json"),
      JSON.stringify(productFilter, null, 3),
      "utf-8"
    );

    return res.redirect("/");
  },
  list: (req, res) => {
    return res.render("admin/adminProducts", {
      products,
    });
  },
};
