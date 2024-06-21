const express = require('express');
const app = express();
const expressFileUpLoad = require('express-fileupload');
const fs = require('fs');
app.listen(3000, ()=>{console.log("http://localhost:3000")});

app.use(express.static('public'));
//configurar fileupload
app.use(expressFileUpLoad({
    limits: {fileSize: 5000000},
    abortOnLimit: true,
    responseOnLimit: "El peso no debe ser mayor a 5MB"
}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/formulario.html");
});
app.post("/imagen", (req, res)=>{
    try{
        const posicion = req.body;
        const { img } = req.files;
        img.mv(`${__dirname}/public/imgs/imagen-${posicion.posicion}.jpg`);
        //res.send("<script>alert('Mensaje de exito')</script>");
        res.sendFile(__dirname+"/formulario.html");
    }catch(err){
        console.error("Error al agregar imagen: ", err);
    }
});
app.delete("/deleteImg/:nombre", async(req, res) => {
    const { nombre } = req.params;
    try{
        await fs.promises.unlink(`${__dirname}/public/imgs/${nombre}.jpg`);
        res.send(`Se ha eliminado la imagen ${nombre}`);
    }catch(err){
        console.log("Error al eliminar imagen", err);
    }
});
