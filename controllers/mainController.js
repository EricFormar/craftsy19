const { readJSON } = require("../data")

module.exports = {
    home : (req,res) => {
        const products = readJSON('products.json');

        return res.render('home',{
            title : "Crafsty 19!",
            newests : products.filter(product => product.category === "Nuevo").filter((element,index) => index < 2),
            refurbished : products.filter(product => product.category === "Refaccionado").filter((element, index) => index < 4)
        })
    },
    admin : (req,res) => {
        return res.render('admin')
    }
}