var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../../config.json");

//getting list of players
router.get("/",function(req,res){
    let query = "SELECT * FROM player";
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if(err)throw err;
        res.status(200).json(rows);
    });
    connection.end();
});

//get specific player
router.get("/player",function(req,res){
    let query = "SELECT * FROM player\
                 WHERE CI = ? AND password = ?";
    let params = [req.body.CI,req.body.password];
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,params,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});

//create new player record
router.post("/",function(req,res){
let query = "INSERT INTO player(name,CI,password)\
             VALUES(?,?,?)";
let player = [req.body.name,req.body.CI,req.body.password];
var connection = mysql.createConnection(config.connection);
connection.connect();
connection.query(query,player,function(err,rows,fields){
    if (err) throw err;
    res.status(200).json(rows);
});
connection.end();
});



module.exports = router;