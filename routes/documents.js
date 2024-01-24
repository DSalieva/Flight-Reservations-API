const router = require("express").Router();
// const path = require('path')

router.all("/", (req, res) => {
  res.send({
    swagger: "/api/documents/swagger",
    redoc: "/api/documents/redoc",
    json: "/api/documents/json",
  });
});

router.all("/json", (req, res) => {
  //    const filePath = path.resolve(__dirname, '../config/swagger.json')
  //    console.log(filePath)
  //    res.sendFile(filePath)

  res.sendFile("/config/swagger.json", { root: "." });
});

// Swagger
const swaggerUi = require("swagger-ui-express");
router.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(require("../config/swagger.json"))
);

// Redoc
const redoc = require("redoc-express");
router.get(
  "/redoc",
  redoc({ specUrl: "/api/documents/json", title: "API Docs" })
);

module.exports = router;
