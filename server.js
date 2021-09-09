const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { users } = require("./endpoints");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userHandlers = users({ axios });

app.get("/", userHandlers.get);
app.post("/", userHandlers.post);
app.put("/:id", userHandlers.put);
app.delete("/:id", userHandlers.delete);
app.listen(port, () => {
  console.log(`Connected port:${port}`);
});
