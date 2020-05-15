var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../../config.json");


//get complete list of tale-records
router.get("/tales_records",function(req,res){
    let query = "SELECT * FROM tales_record";
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});

//get only the tales-records of an specific player
router.get("/tales_records/:playerid",function(req,res){
    let playerId = req.params.playerid;
    let query = `SELECT * FROM tales_record\
                 WHERE player_id = ${playerId}`;

    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    })
});

//get specific tale record of a specific player
router.get("/tale_record/:talesid/:playerid",function(req,res){
    let playerId = req.params.playerid,
        talesId = req.params.talesid,
        query = `SELECT * FROM tales_record\
                 WHERE player_id = ${playerId} AND tales_id = ${talesId}`;
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if (err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});

//update a specific tale record of a specific player
router.put("/tale_record/:talesid/:playerid",function(req,res){
    let playerId = req.params.playerid,
        talesId = req.params.talesid,
        query = `UPDATE tales_record SET status = true\
                 WHERE player_id = ${playerId} AND tales_id = ${talesId}`;
    
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});

//create a new tale record for a specific player
router.post("/tales_records",function(req,res){
    let query = "INSERT INTO tales_record(tales_id,player_id,status)\
                 VALUES (?,?,?)",
        newRecord = [req.body.talesid,req.body.playerid,req.body.status];
    
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,newRecord,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
})

module.exports = router;