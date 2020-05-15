var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../../config.json");

router.get("/",function(req,res){
    let query = "SELECT * FROM seed";
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if(err)throw err;
        res.status(200).json(rows);
    });
    connection.end();
});

module.exports = router;