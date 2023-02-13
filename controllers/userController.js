const fs = require("fs");
const path = require("path");

module.exports = {
  register: (req, res) => {
    return res.render("register");
  },
  processRegister: (req, res) => {

      let { nombre, apellido, email, password } = req.body;
      let lastID = usuarios.length !== 0 ? usuarios[usuarios.length - 1].id : 0;
      let nuevoUsuario = {
        id: +lastID + 1,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email,
        password : 123123,
        rol : "user"
      };

      usuarios.push(nuevoUsuario);

      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "users.json"),
        JSON.stringify(usuarios, null, 3),
        "utf-8"
      );

    

      return res.redirect("/");

  
  },
  login: (req, res) => {
    return res.render("login");
  },
  processLogin: (req, res) => {


      const {id, nombre, rol } = usuarios.find(usuario => usuario.email === req.body.email);

    
     
      return res.redirect("/");

 

  },
  logout : (req,res) => {
    return res.redirect('/')
  },
  profile : (req,res) => {
    const usuarios = JSON.parse(fs.readFileSync('./data/users.json','utf-8'));
    const usuario = usuarios.find(usuario => usuario.id === req.session.userLogin.id);
    return res.render('profile',{
      usuario
    })
  },
  updateProfile : (req,res) => {

      const {nombre,apellido,email,fecha,domicilio} = req.body

      const usuariosModificados = usuarios.map((usuario) => {
        if (usuario.id === id) {
          let usuarioModificado = {
            ...usuario,
            nombre : nombre.trim(),
            apellido : apellido.trim(),
            fecha,
            domicilio : domicilio.trim(),
            //img: req.file ? req.file.filename : product.img,
          };
      
          if (req.file) {
            if (
              fs.existsSync(
                path.resolve(__dirname, "..", "public", "images", product.img)
              ) &&
              product.img !== "noimage.jpeg"
            ) {
              fs.unlinkSync(
                path.resolve(__dirname, "..", "public", "images", product.img)
              );
            }
          }
          return usuarioModificado;
        }
        return usuario;
      });

      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "users.json"),
        JSON.stringify(usuariosModificados, null, 3),
        "utf-8"
      );


      

      return res.redirect("/");
 

  }
};
