const app = require("./app");
const PORT = process.env.PORT || 8080;

async function startServer() {
  //Inicializo mi "storage"
  try {
    await require("./models/productos").init();
  } catch (error) {
    console.log(error);
  }

  const server = app.listen(PORT, () =>
    console.log(
      `Servidor http escuchando en el puerto ${server.address().port}`
    )
  );
  server.on("error", error =>
    console.log(`Ocurrió un error en el servidor:\n ${error}`)
  );
}

startServer();
