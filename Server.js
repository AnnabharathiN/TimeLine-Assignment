const express = require("express");
require("./Config/mongoose");
const routes = require("./Config/routes");
const app = express();
const path = require("path");

app.get("/style.css", (req, res) => {
 res.sendFile(path.join(__dirname, "Views", "style.css"));
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views/css"));
app.use( "/",routes);
app.listen(3000, () => 
  console.log("Server is running on port 3000"));


