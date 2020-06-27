var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var config = require("../../config.json");

//get all seed records of a specifid player
router.get("/player",function(req,res){
    var connection = mysql.createConnection(config.connection);
    connection.connect();

    let playerId = req.query.playerId;
    let query = `SELECT * FROM seed_record WHERE player_id = ${playerId}`;
    connection.query(query,function(err,rows,fields){
        if (err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
});

//generate all seed records for a specific player
router.post("/player",function(req,res){
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    let playerId = req.body.playerId;
    for(let seedId = 1; seedId<=12;seedId++){
        let query = `INSERT INTO seed_record(player_id,seed_id,earned,used)\
                     VALUES(${playerId},${seedId},0,0)`;
        connection.query(query,function(err,rows,fields){
            if (err) throw err;
        });
    }
    let query = `SELECT * FROM seed_record WHERE player_id = ${playerId}`;
    connection.query(query,function(err,rows,fields){
        if(err) throw err;
        res.status(200).json(rows);
    });

    connection.end();
});

router.put('/seed/:seedid',function(req,res){
    let seedId = req.params.seedid,
        playerId = req.body.playerid,
        earned = (req.body.earned === true)? 1:0,
        seedRecord = [earned, seedId, playerId],
        query = "UPDATE seed_record SET earned = ? WHERE seed_id = ? AND player_id = ?";
    var connection = mysql.createConnection(config.connection);
    connection.connect();
    connection.query(query,seedRecord,function(err, rows, fields){
        if(err) throw err;
    });

    query = `SELECT * FROM seed_record WHERE seed_id = ${seedId} AND player_id = ${playerId}`;
    connection.query(query, function(err, rows, fields){
        if (err) throw err;
        res.status(200).json(rows);
    });
    connection.end();
})


module.exports = router;