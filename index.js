const express = require("express");
let app = express();
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
require("./db/conn");
app.use(express.json());
app.use(cors());

app.use(require("./routes/userRoutes"));

app.use(express.static(path.join(__dirname, "./build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

app.listen(process.env.PORT, console.log("server is running...."));
