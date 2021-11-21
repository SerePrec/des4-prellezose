const express = require("express");
const router = express.Router();
const productos = require("../models/productos");
const validateData = require("../middelwares/validateData");

router.get("/", async (req, res) => {
  try {
    const lista = await productos.getAll();
    res.json(lista);
  } catch (error) {
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo recuperar la infomación"
    });
  }
});
/* router.post("/", async (req, res) => {
  try {
    let { title, price, thumbnail } = req.body;
    if (
      !(typeof title == "string" && /\w+/.test(title)) ||
      !(
        (typeof price == "string" || typeof price == "number") &&
        /^\d+(\.\d+)?$/.test(price)
      ) ||
      !(typeof thumbnail == "string" && /\w+/.test(thumbnail))
    )
      res.json({ error: "Los valores enviados no son válidos" });
    else {
      title = title.trim();
      price = Math.round(parseFloat(price) * 100) / 100;
      thumbnail = thumbnail.trim();
      const newProduct = { title, price, thumbnail };
      const id = await productos.save(newProduct);
      res.json({ id, ...newProduct });
    }
  } catch (error) {
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo agregar el producto"
    });
  }
}); */
router.post("/", validateData.validatePostBody, async (req, res) => {
  try {
    let { title, price, thumbnail } = req.body;
    const newProduct = { title, price, thumbnail };
    const id = await productos.save(newProduct);
    res.json({ id, ...newProduct });
  } catch (error) {
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo agregar el producto"
    });
  }
});
/* router.get("/:id", async (req, res) => {
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
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo recuperar la infomación"
    });
  }
}); */
router.get("/:id", validateData.validateId, async (req, res) => {
  try {
    const producto = await productos.getById(req.params.id);
    producto !== null
      ? res.json(producto)
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo recuperar la infomación"
    });
  }
});
/* router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    if (isNaN(id)) return res.json({ error: "El parámetro no es válido" });
    let { title, price, thumbnail } = req.body;
    if (
      (title !== undefined &&
        !(typeof title == "string" && /\w+/.test(title))) ||
      (price !== undefined &&
        !(
          (typeof price == "string" || typeof price == "number") &&
          /^\d+(\.\d+)?$/.test(price)
        )) ||
      (thumbnail !== undefined &&
        !(typeof thumbnail == "string" && /\w+/.test(thumbnail)))
    )
      res.json({ error: "Los valores enviados no son válidos" });
    else {
      id = parseInt(id);
      title = title?.trim();
      price = price && Math.round(parseFloat(price) * 100) / 100;
      thumbnail = thumbnail?.trim();
      let updateProduct = { title, price, thumbnail };
      updateProduct = await productos.updateById(id, updateProduct);
      updateProduct !== null
        ? res.json(updateProduct)
        : res.json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    error.contenedor || console.log(error);
    res.status(500).json({
      error: "No se pudo actualizar el producto"
    });
  }
}); */
router.put(
  "/:id",
  validateData.validateId,
  validateData.validatePutBody,
  async (req, res) => {
    try {
      const { title, price, thumbnail } = req.body;
      const { id } = req.params;
      let updateProduct = { title, price, thumbnail };
      updateProduct = await productos.updateById(id, updateProduct);
      updateProduct !== null
        ? res.json(updateProduct)
        : res.json({ error: "Producto no encontrado" });
    } catch (error) {
      error.contenedor || console.log(error);
      res.status(500).json({
        error: "No se pudo actualizar el producto"
      });
    }
  }
);

module.exports = router;
