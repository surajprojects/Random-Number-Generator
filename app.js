// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// };

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", (req, res) => {
    const { range1, range2 } = req.body;
    res.redirect(`/random?range1=${range1}&range2=${range2}`);
});

app.get("/random", (req, res) => {
    const range1 = req.query.range1 > 0 ? req.query.range1 : 0;
    const range2 = req.query.range2 >= 1 ? req.query.range2 : 10;
    res.render("random", { range1, range2 });
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found!", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = "Oh No, Something went wrong!";
    }
    else {
        res.status(statusCode).render("error", { err });
    };
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`SERVING ON PORT ${port}!!!`)
});