const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// Middleware
app.use(express.static("public"));

// Middleware para parsear el body del request
app.use(express.urlencoded({ extended: true }));
app.post("/prestamo", (req, res) => {
  const { id, nombre, apellido, titulo, autor, editorial, año } = req.body;

  // Verificar que todos los campos estén completos
  if (!id || !nombre || !apellido || !titulo || !autor || !editorial || !año) {
    return res.redirect("/error.html");
  }
  // Crear el contenido del archivo txt
  const contenido = `${id}, ${nombre}, ${apellido}, ${titulo}, ${autor}, ${editorial}, ${año}`;
  // Nombre del archivo basado en el ID
  const archivoNombre = `data/id_${id}.txt`;
  fs.writeFile(archivoNombre, contenido, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error interno del servidor: " + err.message);
    }
    res.download(archivoNombre, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("Error al descargar el archivo: " + err.message);
      }
    });
  });
});
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
