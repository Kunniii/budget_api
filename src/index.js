// simple express server
import express from "express";
var app = express();
var port = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.json({
    OK: true,
  });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${port}!`);
  }
});
