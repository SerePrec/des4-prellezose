const express = require("express");
const router = express.Router();
const productos = require("../model/productos");

router.get("/", async (req, res) => {
  try {
    const lista = await productos.getAll();
    res.json(lista);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No se pudo recuperar la infomación"
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) res.json({ error: "El parámetro no es válido" });
    else {
      id = parseInt(id);
      const producto = await productos.getById(id);
      producto !== null
        ? res.json(producto)
        : res.json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({
      error: "No se pudo recuperar la infomación"
    });
    console.log(error);
  }
});

module.exports = router;
