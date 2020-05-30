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
    let params = [req.query.ci,req.query.password];
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
let playerName = req.body.name, 
    playerCI = req.body.CI,
    playerPassword = req.body.password,
    player = [playerName,playerCI,playerPassword],
    query = `SELECT * FROM player\
             WHERE name = '${playerName}' AND CI = '${playerCI}' and password = '${playerPassword}'`;

var connection = mysql.createConnection(config.connection);
connection.connect();
connection.query(query,player,function(err,rows,fields){
    if (err) throw err;
    if (rows.length>0){
    res.status(200).send('user already exists in database');
    }else{
        var connectionAux = mysql.createConnection(config.connection);
        connectionAux.connect();
        query = "INSERT INTO player(name,CI,password) VALUES(?,?,?)";
        connectionAux.query(query,player,function(err,rows,fields){
            if (err) throw err});
        
        query = `SELECT * FROM player WHERE name = '${playerName}'\
        AND CI = '${playerCI}' and password = '${playerPassword}'`;
        connectionAux.query(query,function(err,rows,fields){
            if(err) throw err;
            res.status(200).json(rows)});
        connectionAux.end();
    }
});

connection.end();

});



module.exports = router;