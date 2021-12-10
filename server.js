const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./dist/FrontendPedidos"));

// app.get("/*", (req, res) => {
//   response.sendFile("index.html", { root: "dist/FrontendPedidos" });
// });

app.get("/*", (req, res) =>
  response.sendFile("index.html", { root: "dist/FrontendPedidos" })
);

app.listen(process.env.PORT || 4200);
