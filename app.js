// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// };

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/random", (req, res) => {
    try {
    const range1 = req.query.range1 > 0 ? req.query.range1 : 0;
    const range2 = req.query.range2 >= 1 ? req.query.range2 : 10;
    const range = [range1, range2];
    res.render("random", { range });
    }
    catch (e) {
        console.log(e);
        res.render("error");
    }
});

app.all("*", (req, res, next) => {
    res.render("error");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`SERVING ON PORT ${port}!!!`)
});