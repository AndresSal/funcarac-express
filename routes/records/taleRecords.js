var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../../config.json");


//get complete list of tale-records
router.get("/",function(req,res){
    let query = "SELECT * FROM tales_record";
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
})

//get only the tales-records of an specific player
router.get("/:playerid",function(req,res){
    let playerId = req.params.playerid;
    let query = `SELECT * FROM tales_record\
                 WHERE player_id = ${playerId}`;

    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    })
})

module.exports = router;