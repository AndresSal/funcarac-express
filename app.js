const express = require("express");
const app = express();
const port = 3020;

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

var book = require("./routes/base/book");
app.use("/book",book);

var carac_month = require("./routes/base/caracMonth");
app.use("/carac_month",carac_month);

var puzzle_pieces = require("./routes/base/puzzlePieces");
app.use("/puzzle_pieces",puzzle_pieces);

var quiz = require("./routes/base/quiz");
app.use("/quiz",quiz);

var seed = require("./routes/base/seed");
app.use("/seed",seed);

var tales = require("./routes/base/tales");
app.use("/tales",tales);

var tools = require("./routes/base/tools");
app.use("/tools",tools);

app.listen(port,() => {
    console.log(`Example app listening on port ${port}`);
})