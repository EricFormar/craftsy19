const fs = require("fs");
const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../data");

const categories = readJSON("categories.json");
const brands = readJSON("brands.json");

module.exports = {
  list: (req, res) => {
    const products = readJSON("products.json");

    return res.render("products", {
      products,
    });
  },
  detail: (req, res) => {
    const products = readJSON("products.json");

    const product = products.find((product) => product.id === +req.params.id);

    return res.render("productDetail", {
      ...product,
    });
  },
  search: (req, res) => {
    return res.send(req.query);
  },
  add: (req, res) => {
    return res.render("productAdd", {
      categories: readJSON("categories.json"),
      brands: readJSON("brands.json"),
    });
  },
  store: (req, res) => {
    const errors = validationResult(req);

    if(req.fileValidatorError){
      errors.errors.push({
        value: "",
        msg: req.fileValidatorError,
        param: "image",
        location: "file",
      });
    }

    if (!req.file) {
      errors.errors.push({
        value: "",
        msg: "El producto debe tener una imagen",
        param: "image",
        location: "file",
      });
    }

    if (errors.isEmpty()) {
      const products = readJSON("products.json");
      const { name, price, category, description, discount, brand } = req.body;

      const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: name.trim(),
        price: +price,
        discount: +discount,
        category,
        brand,
        description: description.trim(),
        image: req.file.filename,
      };

      products.push(newProduct);

      writeJSON("products.json", products);

      return res.redirect("/");
    } else {
      if (req.file) {
        fs.existsSync(`./public/images/products/${req.file.filename}`) &&
          fs.unlinkSync(`./public/images/products/${req.file.filename}`);
      }

      return res.render("productAdd", {
        categories,
        brands,
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  edit: (req, res) => {
    const products = readJSON("products.json");

    const product = products.find((product) => product.id === +req.params.id);

    return res.render("productEdit", {
      ...product,
      brands,
      categories,
    });
  },
  update: (req, res) => {
    const errors = validationResult(req);

    if(req.fileValidatorError){
      errors.errors.push({
        value: "",
        msg: req.fileValidatorError,
        param: "image",
        location: "file",
      });
    }

    if (errors.isEmpty()) {
      const { name, price, category, description, discount, brand } = req.body;
      const products = readJSON("products.json");

      const productsModify = products.map((product) => {
        if (product.id === +req.params.id) {
          let productModify = {
            ...product,
            name: name.trim(),
            price: +price,
            discount: +discount,
            category,
            brand,
            description: description.trim(),
            image: req.file ? req.file.filename : product.image,
          };

          if (req.file) {
            fs.existsSync(`./public/images/products/${product.image}`) &&
              fs.unlinkSync(`./public/images/products/${product.image}`);
          }

          return productModify;
        }
        return product;
      });

      writeJSON("products.json", productsModify);

      return res.redirect("/");
    } else {
      const products = readJSON("products.json");

      const product = products.find((product) => product.id === +req.params.id);

      if (req.file) {
        fs.existsSync(`./public/images/products/${req.file.filename}`) &&
          fs.unlinkSync(`./public/images/products/${req.file.filename}`);
      }

      return res.render("productEdit", {
        ...product,
        brands,
        categories,
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  remove: (req, res) => {
    const productFilter = products.filter(
      (product) => product.id !== +req.params.id
    );

    writeJSON("products.json", productFilter);

    return res.redirect("/");
  },
};
