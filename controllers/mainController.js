const { readJSON } = require("../data")

module.exports = {
    home : (req,res) => {
        const products = readJSON('products.json')
        return res.render('home',{
            title : "Comisión 19",
            products
        })
    },
    admin : (req,res) => {
        return res.render('admin')
    }
}