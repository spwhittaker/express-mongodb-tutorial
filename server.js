const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

MongoClient.connect(
  "mongodb+srv://mrstarwars:startrekwars@surreal-db-yhgm9.mongodb.net/test?retryWrites=true&w=majority",
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("starwarsquotes");
    app.listen(3000, () => console.log("listening on port 3000"));
  }
);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  /* res.sendFile(
    "/home/stephen/Projects/express-mongodb-tutorial" + "/index.html"
  ) */
  db
    .collection("quotes")
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render("index.ejs", { quotes: result });
    })
);
app.post("/quotes", (req, res) => {
  db.collection("quotes").save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});
