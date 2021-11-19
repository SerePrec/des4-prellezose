const express = require("express");
const router = express.Router();
const productos = require("../model/productos");

router.get("/", async (req, res) => {
  try {
    const lista = await productos.getAll();
    res.send(lista);
  } catch (error) {
    console.log(error);
    res.send({
      error: "No se pudo recuperar la infomación"
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const lista = await productos.getAll();
    res.send(lista);
  } catch (error) {
    // console.log(error);
    // res.send({
    //   error: "No se pudo recuperar la infomación"
    // });
  }
});

module.exports = router;
