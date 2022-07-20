const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// app.use(express.static("build"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
}
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
